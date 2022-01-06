import {useConfirm} from "material-ui-confirm";
import {useTranslation} from "next-i18next";

export const useDeleteConfirm = () => {
    const confirm = useConfirm();
    const {t} = useTranslation();
    return async () => {
        try {
            return await confirm({
                description: t('This action is unrecoverable!'),
                confirmationButtonProps: {
                    variant: "contained",
                    color: "error",
                },
                confirmationText: t("Delete"),
                cancellationButtonProps: {
                    variant: "contained"
                }
            })
        } catch (e) {
            return Promise.reject("cancelled")
        }
    }
};
