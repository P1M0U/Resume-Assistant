import { Setting, Tools, Delete, Download, RefreshRight, InfoFilled, Moon, Bell, Document, Position, Edit, } from '@element-plus/icons-vue';
import { useSettings } from '@/composables/useSettings';
const { settings, handleSettingChange, handleClearCache, handleExportData, handleResetSettings } = useSettings();
const iconMap = {
    Moon,
    Bell,
    Document,
    Globe: Position,
    FontSize: Edit,
};
const getIconComponent = (iconName) => {
    return iconMap[iconName] ?? Setting;
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-container" },
});
/** @type {__VLS_StyleScopedClasses['settings-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-header" },
});
/** @type {__VLS_StyleScopedClasses['settings-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-section" },
});
/** @type {__VLS_StyleScopedClasses['settings-section']} */ ;
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
/** @ts-ignore @type {typeof __VLS_components.Setting} */
Setting;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
var __VLS_3;
let __VLS_11;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    ...{ class: "settings-card" },
    shadow: "hover",
}));
const __VLS_13 = __VLS_12({
    ...{ class: "settings-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['settings-card']} */ ;
const { default: __VLS_16 } = __VLS_14.slots;
for (const [setting] of __VLS_vFor((__VLS_ctx.settings))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (setting.id),
        ...{ class: "setting-item" },
    });
    /** @type {__VLS_StyleScopedClasses['setting-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "setting-info" },
    });
    /** @type {__VLS_StyleScopedClasses['setting-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    let __VLS_17;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    const { default: __VLS_22 } = __VLS_20.slots;
    const __VLS_23 = (__VLS_ctx.getIconComponent(setting.icon));
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    // @ts-ignore
    [settings, getIconComponent,];
    var __VLS_20;
    (setting.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (setting.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "setting-control" },
    });
    /** @type {__VLS_StyleScopedClasses['setting-control']} */ ;
    if (setting.type === 'switch') {
        let __VLS_28;
        /** @ts-ignore @type {typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch} */
        elSwitch;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            ...{ 'onChange': {} },
            modelValue: (setting.value),
            activeColor: "#00bcd4",
        }));
        const __VLS_30 = __VLS_29({
            ...{ 'onChange': {} },
            modelValue: (setting.value),
            activeColor: "#00bcd4",
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        let __VLS_33;
        const __VLS_34 = ({ change: {} },
            { onChange: (...[$event]) => {
                    if (!(setting.type === 'switch'))
                        return;
                    __VLS_ctx.handleSettingChange(setting.id, $event);
                    // @ts-ignore
                    [handleSettingChange,];
                } });
        var __VLS_31;
        var __VLS_32;
    }
    else if (setting.type === 'select') {
        let __VLS_35;
        /** @ts-ignore @type {typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect} */
        elSelect;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
            ...{ 'onChange': {} },
            modelValue: (setting.value),
            placeholder: "请选择",
        }));
        const __VLS_37 = __VLS_36({
            ...{ 'onChange': {} },
            modelValue: (setting.value),
            placeholder: "请选择",
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        let __VLS_40;
        const __VLS_41 = ({ change: {} },
            { onChange: (...[$event]) => {
                    if (!!(setting.type === 'switch'))
                        return;
                    if (!(setting.type === 'select'))
                        return;
                    __VLS_ctx.handleSettingChange(setting.id, $event);
                    // @ts-ignore
                    [handleSettingChange,];
                } });
        const { default: __VLS_42 } = __VLS_38.slots;
        for (const [option] of __VLS_vFor((setting.options))) {
            let __VLS_43;
            /** @ts-ignore @type {typeof __VLS_components.elOption | typeof __VLS_components.ElOption} */
            elOption;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
                key: (option.value),
                label: (option.label),
                value: (option.value),
            }));
            const __VLS_45 = __VLS_44({
                key: (option.value),
                label: (option.label),
                value: (option.value),
            }, ...__VLS_functionalComponentArgsRest(__VLS_44));
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_38;
        var __VLS_39;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_14;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-section" },
});
/** @type {__VLS_StyleScopedClasses['settings-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
let __VLS_48;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
let __VLS_54;
/** @ts-ignore @type {typeof __VLS_components.Tools} */
Tools;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({}));
const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
// @ts-ignore
[];
var __VLS_51;
let __VLS_59;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    ...{ class: "settings-card" },
    shadow: "hover",
}));
const __VLS_61 = __VLS_60({
    ...{ class: "settings-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
/** @type {__VLS_StyleScopedClasses['settings-card']} */ ;
const { default: __VLS_64 } = __VLS_62.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "action-section" },
});
/** @type {__VLS_StyleScopedClasses['action-section']} */ ;
let __VLS_65;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    ...{ class: "action-button" },
    type: "warning",
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    ...{ class: "action-button" },
    type: "warning",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
const __VLS_71 = ({ click: {} },
    { onClick: (__VLS_ctx.handleClearCache) });
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
const { default: __VLS_72 } = __VLS_68.slots;
let __VLS_73;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({}));
const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
const { default: __VLS_78 } = __VLS_76.slots;
let __VLS_79;
/** @ts-ignore @type {typeof __VLS_components.Delete} */
Delete;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({}));
const __VLS_81 = __VLS_80({}, ...__VLS_functionalComponentArgsRest(__VLS_80));
// @ts-ignore
[handleClearCache,];
var __VLS_76;
// @ts-ignore
[];
var __VLS_68;
var __VLS_69;
let __VLS_84;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    ...{ 'onClick': {} },
    ...{ class: "action-button" },
    type: "primary",
}));
const __VLS_86 = __VLS_85({
    ...{ 'onClick': {} },
    ...{ class: "action-button" },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
const __VLS_90 = ({ click: {} },
    { onClick: (__VLS_ctx.handleExportData) });
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
const { default: __VLS_91 } = __VLS_87.slots;
let __VLS_92;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
let __VLS_98;
/** @ts-ignore @type {typeof __VLS_components.Download} */
Download;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({}));
const __VLS_100 = __VLS_99({}, ...__VLS_functionalComponentArgsRest(__VLS_99));
// @ts-ignore
[handleExportData,];
var __VLS_95;
// @ts-ignore
[];
var __VLS_87;
var __VLS_88;
let __VLS_103;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
    ...{ 'onClick': {} },
    ...{ class: "action-button" },
    type: "danger",
}));
const __VLS_105 = __VLS_104({
    ...{ 'onClick': {} },
    ...{ class: "action-button" },
    type: "danger",
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
let __VLS_108;
const __VLS_109 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetSettings) });
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
const { default: __VLS_110 } = __VLS_106.slots;
let __VLS_111;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({}));
const __VLS_113 = __VLS_112({}, ...__VLS_functionalComponentArgsRest(__VLS_112));
const { default: __VLS_116 } = __VLS_114.slots;
let __VLS_117;
/** @ts-ignore @type {typeof __VLS_components.RefreshRight} */
RefreshRight;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({}));
const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
// @ts-ignore
[handleResetSettings,];
var __VLS_114;
// @ts-ignore
[];
var __VLS_106;
var __VLS_107;
// @ts-ignore
[];
var __VLS_62;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-section" },
});
/** @type {__VLS_StyleScopedClasses['settings-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
let __VLS_122;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({}));
const __VLS_124 = __VLS_123({}, ...__VLS_functionalComponentArgsRest(__VLS_123));
const { default: __VLS_127 } = __VLS_125.slots;
let __VLS_128;
/** @ts-ignore @type {typeof __VLS_components.InfoFilled} */
InfoFilled;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({}));
const __VLS_130 = __VLS_129({}, ...__VLS_functionalComponentArgsRest(__VLS_129));
// @ts-ignore
[];
var __VLS_125;
let __VLS_133;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
    ...{ class: "settings-card" },
    shadow: "hover",
}));
const __VLS_135 = __VLS_134({
    ...{ class: "settings-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_134));
/** @type {__VLS_StyleScopedClasses['settings-card']} */ ;
const { default: __VLS_138 } = __VLS_136.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "about-section" },
});
/** @type {__VLS_StyleScopedClasses['about-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "version" },
});
/** @type {__VLS_StyleScopedClasses['version']} */ ;
// @ts-ignore
[];
var __VLS_136;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
