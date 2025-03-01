import { Button } from "@/components/ui/button";
import { checkboxVariants } from "@/components/ui/checkbox";
import clsx from "clsx";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <>
                    <span className={kcClsx("kcWebAuthnKeyIcon")} />
                    <span className="ml-1">{msg("webauthn-registration-title")}</span>
                </>
            }
        >
            <form id="register" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                </div>
            </form>
            <Button type="submit" className={"bg-blue-600 hover:bg-blue-700 w-full"} id={authButtonId} value={msgStr("doRegisterSecurityKey")}>
                {msgStr("doRegisterSecurityKey")}
            </Button>

            {!isSetRetry && isAppInitiatedAction && (
                <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-webauthn-settings-form" method="post">
                    <Button type="submit" variant={"secondary"} className=" w-full " id="cancelWebAuthnAIA" name="cancel-aia" value="true">
                        {msgStr("doCancel")}
                    </Button>
                </form>
            )}
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>

                <div className="flex items-center space-x-2 ">
                    <input type="checkbox" id="logout-sessions" className={clsx(checkboxVariants({}), "")}
                        name="logout-sessions" value="on" defaultChecked={true} />

                    <span> {msg("logoutOtherSessions")}</span>
                </div>

            </div>
        </div>
    );
}
