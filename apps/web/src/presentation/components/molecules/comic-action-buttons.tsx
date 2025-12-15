import { ActionButton } from "@/presentation/components/atoms/action-button";
import { CheckIcon } from "@/presentation/components/atoms/icons/check-icon";
import { HeartIcon } from "@/presentation/components/atoms/icons/heart-icon";
import { ShoppingCartIcon } from "@/presentation/components/atoms/icons/shopping-cart-icon";

export const ComicActionButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      <ActionButton variant="primary" icon={<CheckIcon className="h-5 w-5" />}>
        I Have It
      </ActionButton>
      <ActionButton
        variant="secondary"
        icon={<ShoppingCartIcon className="h-5 w-5" />}
      >
        Buy
      </ActionButton>
      <ActionButton variant="ghost" icon={<HeartIcon className="h-5 w-5" />}>
        Add to Desire List
      </ActionButton>
    </div>
  );
};
