import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join BookNook to add books to the shelf and borrow from other readers."
    >
      <RegisterForm />
    </AuthShell>
  );
}
