import { User, Edit, Message, Clock, Check, Close, Lock, Key, InfoFilled, Avatar, CircleCheck, } from '@element-plus/icons-vue';
import { usePersonal } from '@/composables/usePersonal';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { userForm, loading, editing, handleUpdateUser, handleCancelEdit, startEdit } = usePersonal();
/**
 * 格式化日期
 */
const formatDate = (date) => {
    if (!date)
        return '未知';
    const d = new Date(date);
    return d.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "personal-container" },
});
/** @type {__VLS_StyleScopedClasses['personal-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "personal-header" },
});
/** @type {__VLS_StyleScopedClasses['personal-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "personal-section" },
});
/** @type {__VLS_StyleScopedClasses['personal-section']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "personal-card" },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "personal-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['personal-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-header" },
});
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.User} */
User;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_9;
if (!__VLS_ctx.editing) {
    let __VLS_17;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        ...{ 'onClick': {} },
        ...{ class: "edit-btn" },
        type: "primary",
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onClick': {} },
        ...{ class: "edit-btn" },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_22;
    const __VLS_23 = ({ click: {} },
        { onClick: (__VLS_ctx.startEdit) });
    /** @type {__VLS_StyleScopedClasses['edit-btn']} */ ;
    const { default: __VLS_24 } = __VLS_20.slots;
    let __VLS_25;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    let __VLS_31;
    /** @ts-ignore @type {typeof __VLS_components.Edit} */
    Edit;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    // @ts-ignore
    [editing, startEdit,];
    var __VLS_28;
    // @ts-ignore
    [];
    var __VLS_20;
    var __VLS_21;
}
let __VLS_36;
/** @ts-ignore @type {typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components.elForm | typeof __VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    model: (__VLS_ctx.userForm),
    labelWidth: "100px",
    ...{ class: "user-form" },
}));
const __VLS_38 = __VLS_37({
    model: (__VLS_ctx.userForm),
    labelWidth: "100px",
    ...{ class: "user-form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['user-form']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    label: "用户名",
}));
const __VLS_44 = __VLS_43({
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_47 } = __VLS_45.slots;
if (__VLS_ctx.editing) {
    let __VLS_48;
    /** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        modelValue: (__VLS_ctx.userForm.name),
        placeholder: "请输入用户名",
        clearable: true,
    }));
    const __VLS_50 = __VLS_49({
        modelValue: (__VLS_ctx.userForm.name),
        placeholder: "请输入用户名",
        clearable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-value" },
    });
    /** @type {__VLS_StyleScopedClasses['form-value']} */ ;
    let __VLS_53;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({}));
    const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
    const { default: __VLS_58 } = __VLS_56.slots;
    let __VLS_59;
    /** @ts-ignore @type {typeof __VLS_components.User} */
    User;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({}));
    const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
    // @ts-ignore
    [editing, userForm, userForm,];
    var __VLS_56;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.userStore.userInfo?.name);
}
// @ts-ignore
[userStore,];
var __VLS_45;
let __VLS_64;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    label: "邮箱",
}));
const __VLS_66 = __VLS_65({
    label: "邮箱",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_69 } = __VLS_67.slots;
if (__VLS_ctx.editing) {
    let __VLS_70;
    /** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        modelValue: (__VLS_ctx.userForm.email),
        placeholder: "请输入邮箱",
        clearable: true,
    }));
    const __VLS_72 = __VLS_71({
        modelValue: (__VLS_ctx.userForm.email),
        placeholder: "请输入邮箱",
        clearable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-value" },
    });
    /** @type {__VLS_StyleScopedClasses['form-value']} */ ;
    let __VLS_75;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({}));
    const __VLS_77 = __VLS_76({}, ...__VLS_functionalComponentArgsRest(__VLS_76));
    const { default: __VLS_80 } = __VLS_78.slots;
    let __VLS_81;
    /** @ts-ignore @type {typeof __VLS_components.Message} */
    Message;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({}));
    const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
    // @ts-ignore
    [editing, userForm,];
    var __VLS_78;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.userStore.userInfo?.email);
}
// @ts-ignore
[userStore,];
var __VLS_67;
if (__VLS_ctx.editing) {
    let __VLS_86;
    /** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
        label: "新密码",
    }));
    const __VLS_88 = __VLS_87({
        label: "新密码",
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    const { default: __VLS_91 } = __VLS_89.slots;
    let __VLS_92;
    /** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
        modelValue: (__VLS_ctx.userForm.password),
        type: "password",
        placeholder: "不修改请留空",
        showPassword: true,
        clearable: true,
    }));
    const __VLS_94 = __VLS_93({
        modelValue: (__VLS_ctx.userForm.password),
        type: "password",
        placeholder: "不修改请留空",
        showPassword: true,
        clearable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    // @ts-ignore
    [editing, userForm,];
    var __VLS_89;
}
if (__VLS_ctx.editing && __VLS_ctx.userForm.password) {
    let __VLS_97;
    /** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
        label: "确认密码",
    }));
    const __VLS_99 = __VLS_98({
        label: "确认密码",
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    const { default: __VLS_102 } = __VLS_100.slots;
    let __VLS_103;
    /** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
        modelValue: (__VLS_ctx.userForm.confirmPassword),
        type: "password",
        placeholder: "请再次输入密码",
        showPassword: true,
        clearable: true,
    }));
    const __VLS_105 = __VLS_104({
        modelValue: (__VLS_ctx.userForm.confirmPassword),
        type: "password",
        placeholder: "请再次输入密码",
        showPassword: true,
        clearable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_104));
    // @ts-ignore
    [editing, userForm, userForm,];
    var __VLS_100;
}
let __VLS_108;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
    label: "注册时间",
}));
const __VLS_110 = __VLS_109({
    label: "注册时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_113 } = __VLS_111.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-value" },
});
/** @type {__VLS_StyleScopedClasses['form-value']} */ ;
let __VLS_114;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({}));
const __VLS_116 = __VLS_115({}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const { default: __VLS_119 } = __VLS_117.slots;
let __VLS_120;
/** @ts-ignore @type {typeof __VLS_components.Clock} */
Clock;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({}));
const __VLS_122 = __VLS_121({}, ...__VLS_functionalComponentArgsRest(__VLS_121));
// @ts-ignore
[];
var __VLS_117;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.formatDate(__VLS_ctx.userStore.userInfo?.create_time));
// @ts-ignore
[userStore, formatDate,];
var __VLS_111;
if (__VLS_ctx.editing) {
    let __VLS_125;
    /** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
        ...{ class: "action-buttons" },
    }));
    const __VLS_127 = __VLS_126({
        ...{ class: "action-buttons" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_126));
    /** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
    const { default: __VLS_130 } = __VLS_128.slots;
    let __VLS_131;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.loading),
    }));
    const __VLS_133 = __VLS_132({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    let __VLS_136;
    const __VLS_137 = ({ click: {} },
        { onClick: (__VLS_ctx.handleUpdateUser) });
    const { default: __VLS_138 } = __VLS_134.slots;
    let __VLS_139;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_140 = __VLS_asFunctionalComponent1(__VLS_139, new __VLS_139({}));
    const __VLS_141 = __VLS_140({}, ...__VLS_functionalComponentArgsRest(__VLS_140));
    const { default: __VLS_144 } = __VLS_142.slots;
    let __VLS_145;
    /** @ts-ignore @type {typeof __VLS_components.Check} */
    Check;
    // @ts-ignore
    const __VLS_146 = __VLS_asFunctionalComponent1(__VLS_145, new __VLS_145({}));
    const __VLS_147 = __VLS_146({}, ...__VLS_functionalComponentArgsRest(__VLS_146));
    // @ts-ignore
    [editing, loading, handleUpdateUser,];
    var __VLS_142;
    // @ts-ignore
    [];
    var __VLS_134;
    var __VLS_135;
    let __VLS_150;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
        ...{ 'onClick': {} },
    }));
    const __VLS_152 = __VLS_151({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    let __VLS_155;
    const __VLS_156 = ({ click: {} },
        { onClick: (__VLS_ctx.handleCancelEdit) });
    const { default: __VLS_157 } = __VLS_153.slots;
    let __VLS_158;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_159 = __VLS_asFunctionalComponent1(__VLS_158, new __VLS_158({}));
    const __VLS_160 = __VLS_159({}, ...__VLS_functionalComponentArgsRest(__VLS_159));
    const { default: __VLS_163 } = __VLS_161.slots;
    let __VLS_164;
    /** @ts-ignore @type {typeof __VLS_components.Close} */
    Close;
    // @ts-ignore
    const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({}));
    const __VLS_166 = __VLS_165({}, ...__VLS_functionalComponentArgsRest(__VLS_165));
    // @ts-ignore
    [handleCancelEdit,];
    var __VLS_161;
    // @ts-ignore
    [];
    var __VLS_153;
    var __VLS_154;
    // @ts-ignore
    [];
    var __VLS_128;
}
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "personal-section" },
});
/** @type {__VLS_StyleScopedClasses['personal-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
let __VLS_169;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({}));
const __VLS_171 = __VLS_170({}, ...__VLS_functionalComponentArgsRest(__VLS_170));
const { default: __VLS_174 } = __VLS_172.slots;
let __VLS_175;
/** @ts-ignore @type {typeof __VLS_components.Lock} */
Lock;
// @ts-ignore
const __VLS_176 = __VLS_asFunctionalComponent1(__VLS_175, new __VLS_175({}));
const __VLS_177 = __VLS_176({}, ...__VLS_functionalComponentArgsRest(__VLS_176));
// @ts-ignore
[];
var __VLS_172;
let __VLS_180;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
    ...{ class: "personal-card" },
    shadow: "hover",
}));
const __VLS_182 = __VLS_181({
    ...{ class: "personal-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
/** @type {__VLS_StyleScopedClasses['personal-card']} */ ;
const { default: __VLS_185 } = __VLS_183.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "security-item" },
});
/** @type {__VLS_StyleScopedClasses['security-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "security-info" },
});
/** @type {__VLS_StyleScopedClasses['security-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
let __VLS_186;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({}));
const __VLS_188 = __VLS_187({}, ...__VLS_functionalComponentArgsRest(__VLS_187));
const { default: __VLS_191 } = __VLS_189.slots;
let __VLS_192;
/** @ts-ignore @type {typeof __VLS_components.Key} */
Key;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({}));
const __VLS_194 = __VLS_193({}, ...__VLS_functionalComponentArgsRest(__VLS_193));
// @ts-ignore
[];
var __VLS_189;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_197;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_198 = __VLS_asFunctionalComponent1(__VLS_197, new __VLS_197({
    ...{ 'onClick': {} },
    ...{ class: "security-btn" },
}));
const __VLS_199 = __VLS_198({
    ...{ 'onClick': {} },
    ...{ class: "security-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_198));
let __VLS_202;
const __VLS_203 = ({ click: {} },
    { onClick: (__VLS_ctx.startEdit) });
/** @type {__VLS_StyleScopedClasses['security-btn']} */ ;
const { default: __VLS_204 } = __VLS_200.slots;
// @ts-ignore
[startEdit,];
var __VLS_200;
var __VLS_201;
// @ts-ignore
[];
var __VLS_183;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "personal-section" },
});
/** @type {__VLS_StyleScopedClasses['personal-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
let __VLS_205;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_206 = __VLS_asFunctionalComponent1(__VLS_205, new __VLS_205({}));
const __VLS_207 = __VLS_206({}, ...__VLS_functionalComponentArgsRest(__VLS_206));
const { default: __VLS_210 } = __VLS_208.slots;
let __VLS_211;
/** @ts-ignore @type {typeof __VLS_components.InfoFilled} */
InfoFilled;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({}));
const __VLS_213 = __VLS_212({}, ...__VLS_functionalComponentArgsRest(__VLS_212));
// @ts-ignore
[];
var __VLS_208;
let __VLS_216;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({
    ...{ class: "personal-card" },
    shadow: "hover",
}));
const __VLS_218 = __VLS_217({
    ...{ class: "personal-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
/** @type {__VLS_StyleScopedClasses['personal-card']} */ ;
const { default: __VLS_221 } = __VLS_219.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-item" },
});
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-info" },
});
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
let __VLS_222;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent1(__VLS_222, new __VLS_222({}));
const __VLS_224 = __VLS_223({}, ...__VLS_functionalComponentArgsRest(__VLS_223));
const { default: __VLS_227 } = __VLS_225.slots;
let __VLS_228;
/** @ts-ignore @type {typeof __VLS_components.Avatar} */
Avatar;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({}));
const __VLS_230 = __VLS_229({}, ...__VLS_functionalComponentArgsRest(__VLS_229));
// @ts-ignore
[];
var __VLS_225;
let __VLS_233;
/** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
elTag;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent1(__VLS_233, new __VLS_233({
    type: (__VLS_ctx.userStore.userInfo?.is_admin ? 'danger' : 'primary'),
}));
const __VLS_235 = __VLS_234({
    type: (__VLS_ctx.userStore.userInfo?.is_admin ? 'danger' : 'primary'),
}, ...__VLS_functionalComponentArgsRest(__VLS_234));
const { default: __VLS_238 } = __VLS_236.slots;
(__VLS_ctx.userStore.userInfo?.is_admin ? '管理员' : '普通用户');
// @ts-ignore
[userStore, userStore,];
var __VLS_236;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-item" },
});
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-info" },
});
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
let __VLS_239;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({}));
const __VLS_241 = __VLS_240({}, ...__VLS_functionalComponentArgsRest(__VLS_240));
const { default: __VLS_244 } = __VLS_242.slots;
let __VLS_245;
/** @ts-ignore @type {typeof __VLS_components.CircleCheck} */
CircleCheck;
// @ts-ignore
const __VLS_246 = __VLS_asFunctionalComponent1(__VLS_245, new __VLS_245({}));
const __VLS_247 = __VLS_246({}, ...__VLS_functionalComponentArgsRest(__VLS_246));
// @ts-ignore
[];
var __VLS_242;
let __VLS_250;
/** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
elTag;
// @ts-ignore
const __VLS_251 = __VLS_asFunctionalComponent1(__VLS_250, new __VLS_250({
    type: "success",
}));
const __VLS_252 = __VLS_251({
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_251));
const { default: __VLS_255 } = __VLS_253.slots;
// @ts-ignore
[];
var __VLS_253;
// @ts-ignore
[];
var __VLS_219;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
