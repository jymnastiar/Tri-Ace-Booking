import Button from "@/components/ui/button";
import { Google, Apple } from "@/src/brands";

export default function AuthSocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="secondary" size="xl" href="" icon={<Google />}>
        Google
      </Button>
      <Button variant="secondary" size="xl" href="" icon={<Apple />}>
        Apple
      </Button>
    </div>
  );
}
