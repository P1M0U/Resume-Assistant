import { UserFilled, User, Lock, Message } from '@element-plus/icons-vue';
import { useRegister } from '@/composables/useRegister';
const emit = defineEmits(['close', 'switch-to-login']);
const { registerForm, loading, handleRegister } = useRegister(emit);
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
    ...{ class: "register-overlay" },
});
/** @type {__VLS_StyleScopedClasses['register-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "register-container" },
});
/** @type {__VLS_StyleScopedClasses['register-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "register-card" },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "register-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['register-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "register-header" },
});
/** @type {__VLS_StyleScopedClasses['register-header']} */ ;
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
    ...{ class: "register-form" },
    model: (__VLS_ctx.registerForm),
}));
const __VLS_19 = __VLS_18({
    ...{ 'onSubmit': {} },
    ...{ class: "register-form" },
    model: (__VLS_ctx.registerForm),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
const __VLS_23 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.handleRegister) });
/** @type {__VLS_StyleScopedClasses['register-form']} */ ;
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
    modelValue: (__VLS_ctx.registerForm.username),
    placeholder: "请输入用户名",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
}));
const __VLS_33 = __VLS_32({
    modelValue: (__VLS_ctx.registerForm.username),
    placeholder: "请输入用户名",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
// @ts-ignore
[registerForm, registerForm, handleRegister, User,];
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
    modelValue: (__VLS_ctx.registerForm.email),
    placeholder: "请输入邮箱",
    size: "large",
    prefixIcon: (__VLS_ctx.Message),
    clearable: true,
}));
const __VLS_44 = __VLS_43({
    modelValue: (__VLS_ctx.registerForm.email),
    placeholder: "请输入邮箱",
    size: "large",
    prefixIcon: (__VLS_ctx.Message),
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
// @ts-ignore
[registerForm, Message,];
var __VLS_39;
let __VLS_47;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({}));
const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_52 } = __VLS_50.slots;
let __VLS_53;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    modelValue: (__VLS_ctx.registerForm.password),
    type: "password",
    placeholder: "请输入密码（至少6位）",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}));
const __VLS_55 = __VLS_54({
    modelValue: (__VLS_ctx.registerForm.password),
    type: "password",
    placeholder: "请输入密码（至少6位）",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
// @ts-ignore
[registerForm, Lock,];
var __VLS_50;
let __VLS_58;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({}));
const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
let __VLS_64;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.registerForm.confirmPassword),
    type: "password",
    placeholder: "请确认密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}));
const __VLS_66 = __VLS_65({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.registerForm.confirmPassword),
    type: "password",
    placeholder: "请确认密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_69;
const __VLS_70 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleRegister) });
var __VLS_67;
var __VLS_68;
// @ts-ignore
[registerForm, handleRegister, Lock,];
var __VLS_61;
let __VLS_71;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
    ...{ class: "terms-checkbox" },
}));
const __VLS_73 = __VLS_72({
    ...{ class: "terms-checkbox" },
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
/** @type {__VLS_StyleScopedClasses['terms-checkbox']} */ ;
const { default: __VLS_76 } = __VLS_74.slots;
let __VLS_77;
/** @ts-ignore @type {typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox | typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox} */
elCheckbox;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    modelValue: (__VLS_ctx.registerForm.agreeTerms),
}));
const __VLS_79 = __VLS_78({
    modelValue: (__VLS_ctx.registerForm.agreeTerms),
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_82 } = __VLS_80.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: () => { } },
    ...{ class: "terms-link" },
});
/** @type {__VLS_StyleScopedClasses['terms-link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: () => { } },
    ...{ class: "terms-link" },
});
/** @type {__VLS_StyleScopedClasses['terms-link']} */ ;
// @ts-ignore
[registerForm,];
var __VLS_80;
// @ts-ignore
[];
var __VLS_74;
let __VLS_83;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    ...{ 'onClick': {} },
    ...{ class: "register-button" },
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_85 = __VLS_84({
    ...{ 'onClick': {} },
    ...{ class: "register-button" },
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
let __VLS_88;
const __VLS_89 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRegister) });
/** @type {__VLS_StyleScopedClasses['register-button']} */ ;
const { default: __VLS_90 } = __VLS_86.slots;
// @ts-ignore
[handleRegister, loading,];
var __VLS_86;
var __VLS_87;
// @ts-ignore
[];
var __VLS_20;
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "register-footer" },
});
/** @type {__VLS_StyleScopedClasses['register-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('switch-to-login');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "login-link" },
});
/** @type {__VLS_StyleScopedClasses['login-link']} */ ;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
