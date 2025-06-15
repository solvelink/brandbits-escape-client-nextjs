import { StarRating } from "@/components/StarRating";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Feedback() {
  const t = await getTranslations();

  return (
    <div>
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-2xl">{t("feedback.title")}</h1>
        <p className="rich-text mt-4">{t("feedback.description")}</p>
      </div>
      <div className="px-4 py-6 text-center">
        <p className="text-gray-200 mb-4">{t("feedback.star_label")}</p>
        <StarRating />
      </div>
      <BottomNavigation>
        <Button disabled className="w-full">
          {t("feedback.button")}
        </Button>
      </BottomNavigation>
    </div>
  );
}
