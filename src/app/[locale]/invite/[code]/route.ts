import { redirect } from "@/i18n/navigation";
import { redeemInviteCode } from "@/repository/routes";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string; code: string }> }
) {
  const { locale, code } = await params;
  const cookieStore = await cookies();

  const isValid = code && /^\d{6}$/.test(code);
  if (!isValid) {
    redirect({ href: { pathname: "/invite?error=1" }, locale });
  }

  const numericCode = code.replace(/[^0-9]/g, "");
  try {
    const data = await redeemInviteCode(numericCode);
    cookieStore.set("gameToken", data.gameToken);
  } catch (error) {
    return redirect({ href: { pathname: "/invite?error=1" }, locale });
  }

  return redirect({ href: { pathname: "/game/1" }, locale });
}
