import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";

export default function LoginX509Info(props: PageProps<Extract<KcContext, { pageId: "login-x509-info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, x509 } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("doLogIn")}>
            <form id="kc-x509-login-info" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <Label htmlFor="certificate_subjectDN" className={kcClsx("kcLabelClass")}>
                            {msg("clientCertificate")}
                        </Label>
                    </div>
                    {x509.formData.subjectDN ? (
                        <div className={kcClsx("kcLabelWrapperClass")}>
                            <Label id="certificate_subjectDN" className={kcClsx("kcLabelClass")}>
                                {x509.formData.subjectDN}
                            </Label>
                        </div>
                    ) : (
                        <div className={kcClsx("kcLabelWrapperClass")}>
                            <Label id="certificate_subjectDN" className={kcClsx("kcLabelClass")}>
                                {msg("noCertificate")}
                            </Label>
                        </div>
                    )}
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    {x509.formData.isUserEnabled && (
                        <>
                            <div className={kcClsx("kcLabelWrapperClass")}>
                                <Label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                    {msg("doX509Login")}
                                </Label>
                            </div>
                            <div className={kcClsx("kcLabelWrapperClass")}>
                                <Label id="username" className={kcClsx("kcLabelClass")}>
                                    {x509.formData.username}
                                </Label>
                            </div>
                        </>
                    )}
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <div className={kcClsx("kcFormButtonsWrapperClass")}>
                            <Button name="login" id="kc-login" type="submit" value={msgStr("doContinue")}>
                                {msgStr("doContinue")}
                            </Button>
                            {x509.formData.isUserEnabled && (
                                <Button
                                    variant={"secondary"}
                                    className=" ml-2 "
                                    name="cancel"
                                    id="kc-cancel"
                                    type="submit"
                                    value={msgStr("doIgnore")}
                                >
                                    {msgStr("doIgnore")}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
