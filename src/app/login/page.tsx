import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <LoginForm />
      </Card>
    </div>
  );
}
