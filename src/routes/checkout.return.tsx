import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { PublicShell } from "@/components/layout/PublicShell";
import { Button } from "@/components/ui/button";
import { confirmCoursePurchase } from "@/lib/payments.functions";
import { useStore } from "@/lib/store";

type Search = { enrollment?: string };

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    enrollment: typeof search["enrollment"] === "string" ? search["enrollment"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Payment Confirmation | ElevateHub Ltd" },
      { name: "description", content: "Confirming your Airwallex payment and unlocking course access." },
      { property: "og:title", content: "Payment Confirmation | ElevateHub Ltd" },
      { property: "og:description", content: "Confirming your Airwallex payment and unlocking course access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReturnPage,
});

function ReturnPage() {
  const { enrollment } = useSearch({ from: "/checkout/return" });
  const navigate = useNavigate();
  const { courses, submitEnrollment, approveRequest } = useStore();

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["purchase", enrollment],
    queryFn: () => confirmCoursePurchase({ data: { enrollmentId: enrollment! } }),
    enabled: Boolean(enrollment),
    retry: 2,
  });

  useEffect(() => {
    if (data?.status !== "approved") return;
    const course = courses.find((c) => c.slug === data.courseSlug);
    if (!course) return;
    const id = submitEnrollment({
      userName: "",
      phone: "",
      courseId: course.id,
      courseTitle: course.title,
      method: "airwallex",
      trxId: enrollment ?? "",
      amount: data.amount,
    });
    approveRequest(id);
    toast.success("Payment verified — your course is unlocked.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);

  const approved = data?.status === "approved";

  return (
    <PublicShell>
      <section className="container-eh flex min-h-[60vh] items-center py-16">
        <div className="mx-auto w-full max-w-lg rounded-sm border border-border bg-card p-8 text-center">
          {!enrollment || isError ? (
            <>
              <XCircle className="mx-auto h-10 w-10 text-destructive" />
              <h1 className="mt-4 text-2xl font-bold">We couldn't verify this payment</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                If money left your account, contact support with your order reference and we'll unlock
                access manually.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/contact">Contact support</Link>
              </Button>
            </>
          ) : isPending || isFetching ? (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-accent" />
              <h1 className="mt-4 text-2xl font-bold">Verifying your payment…</h1>
              <p className="mt-2 text-sm text-muted-foreground">This usually takes a few seconds.</p>
            </>
          ) : approved ? (
            <>
              <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
              <h1 className="mt-4 text-2xl font-bold">Payment successful</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {data.courseTitle} is now unlocked in your dashboard.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button onClick={() => navigate({ to: "/dashboard" })}>Start learning</Button>
                <Button variant="outline" asChild>
                  <Link to="/courses">Browse more courses</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Loader2 className="mx-auto h-10 w-10 text-accent" />
              <h1 className="mt-4 text-2xl font-bold">Payment is still processing</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Airwallex hasn't confirmed this payment yet. Check again in a moment.
              </p>
              <Button className="mt-6" onClick={() => void refetch()}>
                Check again
              </Button>
            </>
          )}
        </div>
      </section>
    </PublicShell>
  );
}
