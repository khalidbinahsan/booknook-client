import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login",
};

// Only allow redirects back to our own pages (blocks "//evil.com" style links)
function safeCallbackUrl(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to borrow books, manage your shelf and track your returns."
    >
      <LoginForm callbackUrl={safeCallbackUrl(callbackUrl)} />
    </AuthShell>
  );
}
