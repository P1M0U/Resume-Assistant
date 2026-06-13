import { UserFilled, User, Lock } from '@element-plus/icons-vue';
import { useLogin } from '@/composables/useLogin';
const emit = defineEmits(['close', 'switch-to-register']);
const { loginForm, loading, handleLogin, handleForgotPassword } = useLogin(emit);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "login-overlay" },
});
/** @type {__VLS_StyleScopedClasses['login-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-container" },
});
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "login-card" },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "login-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-header" },
});
/** @type {__VLS_StyleScopedClasses['login-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "logo-icon" },
});
/** @type {__VLS_StyleScopedClasses['logo-icon']} */ ;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.UserFilled} */
UserFilled;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[];
var __VLS_9;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_17;
/** @ts-ignore @type {typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components.elForm | typeof __VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ...{ 'onSubmit': {} },
    ...{ class: "login-form" },
    model: (__VLS_ctx.loginForm),
}));
const __VLS_19 = __VLS_18({
    ...{ 'onSubmit': {} },
    ...{ class: "login-form" },
    model: (__VLS_ctx.loginForm),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
const __VLS_23 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.handleLogin) });
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
const { default: __VLS_24 } = __VLS_20.slots;
let __VLS_25;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
let __VLS_31;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "请输入用户名",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
}));
const __VLS_33 = __VLS_32({
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "请输入用户名",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
// @ts-ignore
[loginForm, loginForm, handleLogin, User,];
var __VLS_28;
let __VLS_36;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.loginForm.password),
    type: "password",
    placeholder: "请输入密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}));
const __VLS_44 = __VLS_43({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.loginForm.password),
    type: "password",
    placeholder: "请输入密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleLogin) });
var __VLS_45;
var __VLS_46;
// @ts-ignore
[loginForm, handleLogin, Lock,];
var __VLS_39;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-options" },
});
/** @type {__VLS_StyleScopedClasses['form-options']} */ ;
let __VLS_49;
/** @ts-ignore @type {typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox | typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox} */
elCheckbox;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.loginForm.rememberMe),
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.loginForm.rememberMe),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const { default: __VLS_54 } = __VLS_52.slots;
// @ts-ignore
[loginForm,];
var __VLS_52;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: (__VLS_ctx.handleForgotPassword) },
    ...{ class: "forgot-password" },
});
/** @type {__VLS_StyleScopedClasses['forgot-password']} */ ;
let __VLS_55;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    ...{ 'onClick': {} },
    ...{ class: "login-button" },
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_57 = __VLS_56({
    ...{ 'onClick': {} },
    ...{ class: "login-button" },
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = ({ click: {} },
    { onClick: (__VLS_ctx.handleLogin) });
/** @type {__VLS_StyleScopedClasses['login-button']} */ ;
const { default: __VLS_62 } = __VLS_58.slots;
// @ts-ignore
[handleLogin, handleForgotPassword, loading,];
var __VLS_58;
var __VLS_59;
// @ts-ignore
[];
var __VLS_20;
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-footer" },
});
/** @type {__VLS_StyleScopedClasses['login-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('switch-to-register');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "register-link" },
});
/** @type {__VLS_StyleScopedClasses['register-link']} */ ;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
