import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <RegisterForm />
      </Card>
    </div>
  );
}
