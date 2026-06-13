import { User, UserFilled, Message, Edit, Delete, Refresh } from '@element-plus/icons-vue';
import { useManage } from '@/composables/useManage';
const { users, loading, editForm, showEditDialog, loadUsers, handleEditUser, handleUpdateUser, handleDeleteUser, closeEditDialog, } = useManage();
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
    ...{ class: "manage-container" },
});
/** @type {__VLS_StyleScopedClasses['manage-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "manage-header" },
});
/** @type {__VLS_StyleScopedClasses['manage-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "manage-section" },
});
/** @type {__VLS_StyleScopedClasses['manage-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.User} */
User;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
var __VLS_3;
let __VLS_11;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    ...{ class: "manage-card" },
    shadow: "hover",
}));
const __VLS_13 = __VLS_12({
    ...{ class: "manage-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['manage-card']} */ ;
const { default: __VLS_16 } = __VLS_14.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-header" },
});
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-info" },
});
/** @type {__VLS_StyleScopedClasses['header-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.users.length);
let __VLS_17;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ...{ 'onClick': {} },
    ...{ class: "refresh-btn" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_19 = __VLS_18({
    ...{ 'onClick': {} },
    ...{ class: "refresh-btn" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
const __VLS_23 = ({ click: {} },
    { onClick: (__VLS_ctx.loadUsers) });
/** @type {__VLS_StyleScopedClasses['refresh-btn']} */ ;
const { default: __VLS_24 } = __VLS_20.slots;
let __VLS_25;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
let __VLS_31;
/** @ts-ignore @type {typeof __VLS_components.Refresh} */
Refresh;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
// @ts-ignore
[users, loading, loadUsers,];
var __VLS_28;
// @ts-ignore
[];
var __VLS_20;
var __VLS_21;
let __VLS_36;
/** @ts-ignore @type {typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components.elTable | typeof __VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    data: (__VLS_ctx.users),
    ...{ style: {} },
    ...{ class: "user-table" },
}));
const __VLS_38 = __VLS_37({
    data: (__VLS_ctx.users),
    ...{ style: {} },
    ...{ class: "user-table" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {__VLS_StyleScopedClasses['user-table']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    prop: "id",
    label: "ID",
    width: "80",
}));
const __VLS_44 = __VLS_43({
    prop: "id",
    label: "ID",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    prop: "name",
    label: "用户名",
    minWidth: "120",
}));
const __VLS_49 = __VLS_48({
    prop: "name",
    label: "用户名",
    minWidth: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_52 } = __VLS_50.slots;
{
    const { default: __VLS_53 } = __VLS_50.slots;
    const [{ row }] = __VLS_vSlot(__VLS_53);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-name" },
    });
    /** @type {__VLS_StyleScopedClasses['user-name']} */ ;
    let __VLS_54;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({}));
    const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const { default: __VLS_59 } = __VLS_57.slots;
    let __VLS_60;
    /** @ts-ignore @type {typeof __VLS_components.UserFilled} */
    UserFilled;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({}));
    const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
    // @ts-ignore
    [users, loading, vLoading,];
    var __VLS_57;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (row.name);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_50;
let __VLS_65;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    prop: "email",
    label: "邮箱",
    minWidth: "180",
}));
const __VLS_67 = __VLS_66({
    prop: "email",
    label: "邮箱",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_70 } = __VLS_68.slots;
{
    const { default: __VLS_71 } = __VLS_68.slots;
    const [{ row }] = __VLS_vSlot(__VLS_71);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-email" },
    });
    /** @type {__VLS_StyleScopedClasses['user-email']} */ ;
    let __VLS_72;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({}));
    const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
    const { default: __VLS_77 } = __VLS_75.slots;
    let __VLS_78;
    /** @ts-ignore @type {typeof __VLS_components.Message} */
    Message;
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({}));
    const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
    // @ts-ignore
    [];
    var __VLS_75;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (row.email);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_68;
let __VLS_83;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    prop: "is_admin",
    label: "角色",
    width: "100",
}));
const __VLS_85 = __VLS_84({
    prop: "is_admin",
    label: "角色",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_88 } = __VLS_86.slots;
{
    const { default: __VLS_89 } = __VLS_86.slots;
    const [{ row }] = __VLS_vSlot(__VLS_89);
    let __VLS_90;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
        type: (row.is_admin ? 'danger' : 'primary'),
        size: "small",
    }));
    const __VLS_92 = __VLS_91({
        type: (row.is_admin ? 'danger' : 'primary'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    const { default: __VLS_95 } = __VLS_93.slots;
    (row.is_admin ? '管理员' : '普通用户');
    // @ts-ignore
    [];
    var __VLS_93;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_86;
let __VLS_96;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    prop: "create_time",
    label: "注册时间",
    width: "180",
}));
const __VLS_98 = __VLS_97({
    prop: "create_time",
    label: "注册时间",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
const { default: __VLS_101 } = __VLS_99.slots;
{
    const { default: __VLS_102 } = __VLS_99.slots;
    const [{ row }] = __VLS_vSlot(__VLS_102);
    (__VLS_ctx.formatDate(row.create_time));
    // @ts-ignore
    [formatDate,];
}
// @ts-ignore
[];
var __VLS_99;
let __VLS_103;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
    label: "操作",
    width: "180",
    fixed: "right",
}));
const __VLS_105 = __VLS_104({
    label: "操作",
    width: "180",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
const { default: __VLS_108 } = __VLS_106.slots;
{
    const { default: __VLS_109 } = __VLS_106.slots;
    const [{ row }] = __VLS_vSlot(__VLS_109);
    let __VLS_110;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_112 = __VLS_111({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
    let __VLS_115;
    const __VLS_116 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEditUser(row);
                // @ts-ignore
                [handleEditUser,];
            } });
    const { default: __VLS_117 } = __VLS_113.slots;
    let __VLS_118;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({}));
    const __VLS_120 = __VLS_119({}, ...__VLS_functionalComponentArgsRest(__VLS_119));
    const { default: __VLS_123 } = __VLS_121.slots;
    let __VLS_124;
    /** @ts-ignore @type {typeof __VLS_components.Edit} */
    Edit;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({}));
    const __VLS_126 = __VLS_125({}, ...__VLS_functionalComponentArgsRest(__VLS_125));
    // @ts-ignore
    [];
    var __VLS_121;
    // @ts-ignore
    [];
    var __VLS_113;
    var __VLS_114;
    let __VLS_129;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
        disabled: (row.is_admin && __VLS_ctx.users.filter((u) => u.is_admin).length === 1),
    }));
    const __VLS_131 = __VLS_130({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
        disabled: (row.is_admin && __VLS_ctx.users.filter((u) => u.is_admin).length === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    let __VLS_134;
    const __VLS_135 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDeleteUser(row.id);
                // @ts-ignore
                [users, handleDeleteUser,];
            } });
    const { default: __VLS_136 } = __VLS_132.slots;
    let __VLS_137;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({}));
    const __VLS_139 = __VLS_138({}, ...__VLS_functionalComponentArgsRest(__VLS_138));
    const { default: __VLS_142 } = __VLS_140.slots;
    let __VLS_143;
    /** @ts-ignore @type {typeof __VLS_components.Delete} */
    Delete;
    // @ts-ignore
    const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({}));
    const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
    // @ts-ignore
    [];
    var __VLS_140;
    // @ts-ignore
    [];
    var __VLS_132;
    var __VLS_133;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_106;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_14;
let __VLS_148;
/** @ts-ignore @type {typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
    ...{ 'onClose': {} },
    modelValue: (__VLS_ctx.showEditDialog),
    title: "编辑用户信息",
    width: "500px",
    closeOnClickModal: (false),
}));
const __VLS_150 = __VLS_149({
    ...{ 'onClose': {} },
    modelValue: (__VLS_ctx.showEditDialog),
    title: "编辑用户信息",
    width: "500px",
    closeOnClickModal: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
let __VLS_153;
const __VLS_154 = ({ close: {} },
    { onClose: (__VLS_ctx.closeEditDialog) });
const { default: __VLS_155 } = __VLS_151.slots;
let __VLS_156;
/** @ts-ignore @type {typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components.elForm | typeof __VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
    model: (__VLS_ctx.editForm),
    labelWidth: "100px",
}));
const __VLS_158 = __VLS_157({
    model: (__VLS_ctx.editForm),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
const { default: __VLS_161 } = __VLS_159.slots;
let __VLS_162;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
    label: "用户名",
}));
const __VLS_164 = __VLS_163({
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
const { default: __VLS_167 } = __VLS_165.slots;
let __VLS_168;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
    modelValue: (__VLS_ctx.editForm.name),
    placeholder: "请输入用户名",
    clearable: true,
}));
const __VLS_170 = __VLS_169({
    modelValue: (__VLS_ctx.editForm.name),
    placeholder: "请输入用户名",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
// @ts-ignore
[showEditDialog, closeEditDialog, editForm, editForm,];
var __VLS_165;
let __VLS_173;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
    label: "邮箱",
}));
const __VLS_175 = __VLS_174({
    label: "邮箱",
}, ...__VLS_functionalComponentArgsRest(__VLS_174));
const { default: __VLS_178 } = __VLS_176.slots;
let __VLS_179;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({
    modelValue: (__VLS_ctx.editForm.email),
    placeholder: "请输入邮箱",
    clearable: true,
}));
const __VLS_181 = __VLS_180({
    modelValue: (__VLS_ctx.editForm.email),
    placeholder: "请输入邮箱",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_180));
// @ts-ignore
[editForm,];
var __VLS_176;
let __VLS_184;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent1(__VLS_184, new __VLS_184({
    label: "新密码",
}));
const __VLS_186 = __VLS_185({
    label: "新密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
const { default: __VLS_189 } = __VLS_187.slots;
let __VLS_190;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
    modelValue: (__VLS_ctx.editForm.password),
    type: "password",
    placeholder: "不修改请留空",
    showPassword: true,
    clearable: true,
}));
const __VLS_192 = __VLS_191({
    modelValue: (__VLS_ctx.editForm.password),
    type: "password",
    placeholder: "不修改请留空",
    showPassword: true,
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_191));
// @ts-ignore
[editForm,];
var __VLS_187;
let __VLS_195;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
    label: "用户角色",
}));
const __VLS_197 = __VLS_196({
    label: "用户角色",
}, ...__VLS_functionalComponentArgsRest(__VLS_196));
const { default: __VLS_200 } = __VLS_198.slots;
let __VLS_201;
/** @ts-ignore @type {typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
    modelValue: (__VLS_ctx.editForm.is_admin),
    activeText: "管理员",
    inactiveText: "普通用户",
    activeColor: "#f56c6c",
    inactiveColor: "#409eff",
}));
const __VLS_203 = __VLS_202({
    modelValue: (__VLS_ctx.editForm.is_admin),
    activeText: "管理员",
    inactiveText: "普通用户",
    activeColor: "#f56c6c",
    inactiveColor: "#409eff",
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
// @ts-ignore
[editForm,];
var __VLS_198;
// @ts-ignore
[];
var __VLS_159;
{
    const { footer: __VLS_206 } = __VLS_151.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_207;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
        ...{ 'onClick': {} },
    }));
    const __VLS_209 = __VLS_208({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_208));
    let __VLS_212;
    const __VLS_213 = ({ click: {} },
        { onClick: (__VLS_ctx.closeEditDialog) });
    const { default: __VLS_214 } = __VLS_210.slots;
    // @ts-ignore
    [closeEditDialog,];
    var __VLS_210;
    var __VLS_211;
    let __VLS_215;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_216 = __VLS_asFunctionalComponent1(__VLS_215, new __VLS_215({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.loading),
    }));
    const __VLS_217 = __VLS_216({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_216));
    let __VLS_220;
    const __VLS_221 = ({ click: {} },
        { onClick: (__VLS_ctx.handleUpdateUser) });
    const { default: __VLS_222 } = __VLS_218.slots;
    // @ts-ignore
    [loading, handleUpdateUser,];
    var __VLS_218;
    var __VLS_219;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_151;
var __VLS_152;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
