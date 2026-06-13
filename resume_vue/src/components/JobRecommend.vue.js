import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useJobRecommend } from '@/composables/useJobRecommend';
const windowWidth = ref(window.innerWidth);
const { targetJob, analyzing, resumeResult, jobMatchResult, dialogVisible, hasResumeData, detailDialogVisible, handleJobRecommend, getMatchScoreLevel, exportRecommendation, showResumeDetail, } = useJobRecommend();
/**
 * 计算对话框宽度
 */
const dialogWidth = computed(() => {
    return windowWidth.value <= 768 ? '95%' : '80%';
});
/**
 * 计算描述列数
 */
const descriptionColumn = computed(() => {
    return windowWidth.value <= 768 ? 1 : 2;
});
/**
 * 根据分数获取标签类型
 */
const getScoreTagType = (score) => {
    if (score >= 90)
        return 'success';
    if (score >= 80)
        return 'primary';
    if (score >= 70)
        return 'warning';
    return 'danger';
};
/**
 * 根据匹配度获取标签类型
 */
const getMatchTagType = (score) => {
    if (score >= 90)
        return 'success';
    if (score >= 80)
        return 'primary';
    if (score >= 70)
        return 'warning';
    return 'danger';
};
/**
 * 监听窗口大小变化
 */
const handleResize = () => {
    windowWidth.value = window.innerWidth;
};
onMounted(() => {
    window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "job-recommend-view" },
});
/** @type {__VLS_StyleScopedClasses['job-recommend-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
elRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    span: (24),
}));
const __VLS_8 = __VLS_7({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ class: "input-card" },
    shadow: "hover",
}));
const __VLS_14 = __VLS_13({
    ...{ class: "input-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['input-card']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
{
    const { header: __VLS_18 } = __VLS_15.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    let __VLS_19;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        size: (24),
        color: "#409EFF",
    }));
    const __VLS_21 = __VLS_20({
        size: (24),
        color: "#409EFF",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    let __VLS_25;
    /** @ts-ignore @type {typeof __VLS_components.Aim} */
    Aim;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    var __VLS_22;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-section" },
});
/** @type {__VLS_StyleScopedClasses['input-section']} */ ;
let __VLS_30;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.targetJob),
    placeholder: "请输入期望岗位（可选，留空则由 AI 自动推荐）",
    ...{ class: "job-input" },
    size: "large",
    clearable: true,
}));
const __VLS_32 = __VLS_31({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.targetJob),
    placeholder: "请输入期望岗位（可选，留空则由 AI 自动推荐）",
    ...{ class: "job-input" },
    size: "large",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_35;
const __VLS_36 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleJobRecommend) });
/** @type {__VLS_StyleScopedClasses['job-input']} */ ;
const { default: __VLS_37 } = __VLS_33.slots;
{
    const { prefix: __VLS_38 } = __VLS_33.slots;
    let __VLS_39;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({}));
    const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    let __VLS_45;
    /** @ts-ignore @type {typeof __VLS_components.Search} */
    Search;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
    // @ts-ignore
    [targetJob, handleJobRecommend,];
    var __VLS_42;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_33;
var __VLS_34;
let __VLS_50;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "recommend-button" },
    loading: (__VLS_ctx.analyzing),
    disabled: (!__VLS_ctx.hasResumeData),
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "recommend-button" },
    loading: (__VLS_ctx.analyzing),
    disabled: (!__VLS_ctx.hasResumeData),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_55;
const __VLS_56 = ({ click: {} },
    { onClick: (__VLS_ctx.handleJobRecommend) });
/** @type {__VLS_StyleScopedClasses['recommend-button']} */ ;
const { default: __VLS_57 } = __VLS_53.slots;
if (!__VLS_ctx.analyzing) {
    let __VLS_58;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({}));
    const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
    const { default: __VLS_63 } = __VLS_61.slots;
    let __VLS_64;
    /** @ts-ignore @type {typeof __VLS_components.MagicStick} */
    MagicStick;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({}));
    const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
    // @ts-ignore
    [handleJobRecommend, analyzing, analyzing, hasResumeData,];
    var __VLS_61;
}
(__VLS_ctx.analyzing ? '分析中...' : '开始推荐');
// @ts-ignore
[analyzing,];
var __VLS_53;
var __VLS_54;
if (!__VLS_ctx.hasResumeData) {
    let __VLS_69;
    /** @ts-ignore @type {typeof __VLS_components.elAlert | typeof __VLS_components.ElAlert} */
    elAlert;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        title: "请先在简历分析页面上传并分析简历",
        type: "warning",
        closable: (false),
        showIcon: true,
        ...{ style: {} },
    }));
    const __VLS_71 = __VLS_70({
        title: "请先在简历分析页面上传并分析简历",
        type: "warning",
        closable: (false),
        showIcon: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
}
if (__VLS_ctx.hasResumeData) {
    let __VLS_74;
    /** @ts-ignore @type {typeof __VLS_components.elAlert | typeof __VLS_components.ElAlert} */
    elAlert;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
        title: "可输入期望岗位进行精准推荐，或留空让 AI 根据简历自动推荐",
        type: "info",
        closable: (false),
        showIcon: true,
        ...{ style: {} },
    }));
    const __VLS_76 = __VLS_75({
        title: "可输入期望岗位进行精准推荐，或留空让 AI 根据简历自动推荐",
        type: "info",
        closable: (false),
        showIcon: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
}
// @ts-ignore
[hasResumeData, hasResumeData,];
var __VLS_15;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.hasResumeData) {
    let __VLS_79;
    /** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
    elRow;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        gutter: (20),
    }));
    const __VLS_81 = __VLS_80({
        gutter: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    const { default: __VLS_84 } = __VLS_82.slots;
    let __VLS_85;
    /** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
        span: (24),
    }));
    const __VLS_87 = __VLS_86({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    const { default: __VLS_90 } = __VLS_88.slots;
    let __VLS_91;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
        ...{ 'onClick': {} },
        ...{ class: "result-card" },
        shadow: "hover",
    }));
    const __VLS_93 = __VLS_92({
        ...{ 'onClick': {} },
        ...{ class: "result-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    let __VLS_96;
    const __VLS_97 = ({ click: {} },
        { onClick: (__VLS_ctx.showResumeDetail) });
    /** @type {__VLS_StyleScopedClasses['result-card']} */ ;
    const { default: __VLS_98 } = __VLS_94.slots;
    {
        const { header: __VLS_99 } = __VLS_94.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-header" },
        });
        /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
        let __VLS_100;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
            size: (24),
            color: "#67C23A",
        }));
        const __VLS_102 = __VLS_101({
            size: (24),
            color: "#67C23A",
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        const { default: __VLS_105 } = __VLS_103.slots;
        let __VLS_106;
        /** @ts-ignore @type {typeof __VLS_components.Document} */
        Document;
        // @ts-ignore
        const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({}));
        const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
        // @ts-ignore
        [hasResumeData, showResumeDetail,];
        var __VLS_103;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        let __VLS_111;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
            type: "info",
            size: "small",
            ...{ style: {} },
        }));
        const __VLS_113 = __VLS_112({
            type: "info",
            size: "small",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_112));
        const { default: __VLS_116 } = __VLS_114.slots;
        // @ts-ignore
        [];
        var __VLS_114;
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "resume-summary" },
    });
    /** @type {__VLS_StyleScopedClasses['resume-summary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-header" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    let __VLS_117;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.resumeResult.score)),
        effect: "dark",
    }));
    const __VLS_119 = __VLS_118({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.resumeResult.score)),
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    const { default: __VLS_122 } = __VLS_120.slots;
    (__VLS_ctx.resumeResult.score);
    // @ts-ignore
    [getScoreTagType, resumeResult, resumeResult,];
    var __VLS_120;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-content" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-item" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.resumeResult.personal_info?.name || '未识别');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-item" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.resumeResult.personal_info?.phone || '未识别');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-item" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.resumeResult.personal_info?.email || '未识别');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-item" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.resumeResult.highlights.length);
    // @ts-ignore
    [resumeResult, resumeResult, resumeResult, resumeResult,];
    var __VLS_94;
    var __VLS_95;
    // @ts-ignore
    [];
    var __VLS_88;
    // @ts-ignore
    [];
    var __VLS_82;
}
let __VLS_123;
/** @ts-ignore @type {typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
    modelValue: (__VLS_ctx.detailDialogVisible),
    title: "简历分析详情",
    width: (__VLS_ctx.dialogWidth),
    closeOnClickModal: (false),
}));
const __VLS_125 = __VLS_124({
    modelValue: (__VLS_ctx.detailDialogVisible),
    title: "简历分析详情",
    width: (__VLS_ctx.dialogWidth),
    closeOnClickModal: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
const { default: __VLS_128 } = __VLS_126.slots;
if (__VLS_ctx.resumeResult) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-dialog-content" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-dialog-content']} */ ;
    let __VLS_129;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        ...{ class: "detail-card" },
        shadow: "never",
    }));
    const __VLS_131 = __VLS_130({
        ...{ class: "detail-card" },
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    const { default: __VLS_134 } = __VLS_132.slots;
    {
        const { header: __VLS_135 } = __VLS_132.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dialog-header" },
        });
        /** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
        let __VLS_136;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
            size: (24),
            color: "#409EFF",
        }));
        const __VLS_138 = __VLS_137({
            size: (24),
            color: "#409EFF",
        }, ...__VLS_functionalComponentArgsRest(__VLS_137));
        const { default: __VLS_141 } = __VLS_139.slots;
        let __VLS_142;
        /** @ts-ignore @type {typeof __VLS_components.ChatDotRound} */
        ChatDotRound;
        // @ts-ignore
        const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({}));
        const __VLS_144 = __VLS_143({}, ...__VLS_functionalComponentArgsRest(__VLS_143));
        // @ts-ignore
        [resumeResult, detailDialogVisible, dialogWidth,];
        var __VLS_139;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        // @ts-ignore
        [];
    }
    let __VLS_147;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions} */
    elDescriptions;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
        column: (__VLS_ctx.descriptionColumn),
        border: true,
    }));
    const __VLS_149 = __VLS_148({
        column: (__VLS_ctx.descriptionColumn),
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_148));
    const { default: __VLS_152 } = __VLS_150.slots;
    let __VLS_153;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
        label: "综合评分",
    }));
    const __VLS_155 = __VLS_154({
        label: "综合评分",
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    const { default: __VLS_158 } = __VLS_156.slots;
    let __VLS_159;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.resumeResult.score)),
        size: "large",
    }));
    const __VLS_161 = __VLS_160({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.resumeResult.score)),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_160));
    const { default: __VLS_164 } = __VLS_162.slots;
    (__VLS_ctx.resumeResult.score);
    // @ts-ignore
    [getScoreTagType, resumeResult, resumeResult, descriptionColumn,];
    var __VLS_162;
    // @ts-ignore
    [];
    var __VLS_156;
    let __VLS_165;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
        label: "姓名",
    }));
    const __VLS_167 = __VLS_166({
        label: "姓名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    const { default: __VLS_170 } = __VLS_168.slots;
    (__VLS_ctx.resumeResult.personal_info?.name || '未识别');
    // @ts-ignore
    [resumeResult,];
    var __VLS_168;
    let __VLS_171;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
        label: "电话",
    }));
    const __VLS_173 = __VLS_172({
        label: "电话",
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    const { default: __VLS_176 } = __VLS_174.slots;
    (__VLS_ctx.resumeResult.personal_info?.phone || '未识别');
    // @ts-ignore
    [resumeResult,];
    var __VLS_174;
    let __VLS_177;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({
        label: "邮箱",
    }));
    const __VLS_179 = __VLS_178({
        label: "邮箱",
    }, ...__VLS_functionalComponentArgsRest(__VLS_178));
    const { default: __VLS_182 } = __VLS_180.slots;
    (__VLS_ctx.resumeResult.personal_info?.email || '未识别');
    // @ts-ignore
    [resumeResult,];
    var __VLS_180;
    let __VLS_183;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
        label: "地址",
    }));
    const __VLS_185 = __VLS_184({
        label: "地址",
    }, ...__VLS_functionalComponentArgsRest(__VLS_184));
    const { default: __VLS_188 } = __VLS_186.slots;
    (__VLS_ctx.resumeResult.personal_info?.location || '未识别');
    // @ts-ignore
    [resumeResult,];
    var __VLS_186;
    // @ts-ignore
    [];
    var __VLS_150;
    let __VLS_189;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
        contentPosition: "left",
    }));
    const __VLS_191 = __VLS_190({
        contentPosition: "left",
    }, ...__VLS_functionalComponentArgsRest(__VLS_190));
    const { default: __VLS_194 } = __VLS_192.slots;
    // @ts-ignore
    [];
    var __VLS_192;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-tags']} */ ;
    for (const [highlight, index] of __VLS_vFor((__VLS_ctx.resumeResult.highlights))) {
        let __VLS_195;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
            key: (index),
            type: "success",
            effect: "dark",
            ...{ class: "detail-tag" },
        }));
        const __VLS_197 = __VLS_196({
            key: (index),
            type: "success",
            effect: "dark",
            ...{ class: "detail-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_196));
        /** @type {__VLS_StyleScopedClasses['detail-tag']} */ ;
        const { default: __VLS_200 } = __VLS_198.slots;
        (highlight);
        // @ts-ignore
        [resumeResult,];
        var __VLS_198;
        // @ts-ignore
        [];
    }
    let __VLS_201;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
        contentPosition: "left",
    }));
    const __VLS_203 = __VLS_202({
        contentPosition: "left",
    }, ...__VLS_functionalComponentArgsRest(__VLS_202));
    const { default: __VLS_206 } = __VLS_204.slots;
    // @ts-ignore
    [];
    var __VLS_204;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-tags']} */ ;
    for (const [issue, index] of __VLS_vFor((__VLS_ctx.resumeResult.issues))) {
        let __VLS_207;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
            key: (index),
            type: "warning",
            effect: "dark",
            ...{ class: "detail-tag" },
        }));
        const __VLS_209 = __VLS_208({
            key: (index),
            type: "warning",
            effect: "dark",
            ...{ class: "detail-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_208));
        /** @type {__VLS_StyleScopedClasses['detail-tag']} */ ;
        const { default: __VLS_212 } = __VLS_210.slots;
        (issue);
        // @ts-ignore
        [resumeResult,];
        var __VLS_210;
        // @ts-ignore
        [];
    }
    let __VLS_213;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
        contentPosition: "left",
    }));
    const __VLS_215 = __VLS_214({
        contentPosition: "left",
    }, ...__VLS_functionalComponentArgsRest(__VLS_214));
    const { default: __VLS_218 } = __VLS_216.slots;
    // @ts-ignore
    [];
    var __VLS_216;
    let __VLS_219;
    /** @ts-ignore @type {typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline} */
    elTimeline;
    // @ts-ignore
    const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({}));
    const __VLS_221 = __VLS_220({}, ...__VLS_functionalComponentArgsRest(__VLS_220));
    const { default: __VLS_224 } = __VLS_222.slots;
    for (const [suggestion, index] of __VLS_vFor((__VLS_ctx.resumeResult.suggestions))) {
        let __VLS_225;
        /** @ts-ignore @type {typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem} */
        elTimelineItem;
        // @ts-ignore
        const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
            color: "#67C23A",
        }));
        const __VLS_227 = __VLS_226({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
            color: "#67C23A",
        }, ...__VLS_functionalComponentArgsRest(__VLS_226));
        const { default: __VLS_230 } = __VLS_228.slots;
        let __VLS_231;
        /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
        elCard;
        // @ts-ignore
        const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
            ...{ class: "suggestion-card" },
        }));
        const __VLS_233 = __VLS_232({
            ...{ class: "suggestion-card" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_232));
        /** @type {__VLS_StyleScopedClasses['suggestion-card']} */ ;
        const { default: __VLS_236 } = __VLS_234.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (suggestion.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (suggestion.content);
        // @ts-ignore
        [resumeResult,];
        var __VLS_234;
        // @ts-ignore
        [];
        var __VLS_228;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_222;
    // @ts-ignore
    [];
    var __VLS_132;
}
{
    const { footer: __VLS_237 } = __VLS_126.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_238;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_239 = __VLS_asFunctionalComponent1(__VLS_238, new __VLS_238({
        ...{ 'onClick': {} },
    }));
    const __VLS_240 = __VLS_239({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_239));
    let __VLS_243;
    const __VLS_244 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.detailDialogVisible = false;
                // @ts-ignore
                [detailDialogVisible,];
            } });
    const { default: __VLS_245 } = __VLS_241.slots;
    // @ts-ignore
    [];
    var __VLS_241;
    var __VLS_242;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_126;
let __VLS_246;
/** @ts-ignore @type {typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_247 = __VLS_asFunctionalComponent1(__VLS_246, new __VLS_246({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "岗位推荐报告",
    width: (__VLS_ctx.dialogWidth),
    closeOnClickModal: (false),
}));
const __VLS_248 = __VLS_247({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "岗位推荐报告",
    width: (__VLS_ctx.dialogWidth),
    closeOnClickModal: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_247));
const { default: __VLS_251 } = __VLS_249.slots;
if (__VLS_ctx.jobMatchResult) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dialog-content" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-content']} */ ;
    let __VLS_252;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_253 = __VLS_asFunctionalComponent1(__VLS_252, new __VLS_252({
        ...{ class: "dialog-card" },
        shadow: "never",
    }));
    const __VLS_254 = __VLS_253({
        ...{ class: "dialog-card" },
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_253));
    /** @type {__VLS_StyleScopedClasses['dialog-card']} */ ;
    const { default: __VLS_257 } = __VLS_255.slots;
    {
        const { header: __VLS_258 } = __VLS_255.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dialog-header" },
        });
        /** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
        let __VLS_259;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_260 = __VLS_asFunctionalComponent1(__VLS_259, new __VLS_259({
            size: (24),
            color: "#409EFF",
        }));
        const __VLS_261 = __VLS_260({
            size: (24),
            color: "#409EFF",
        }, ...__VLS_functionalComponentArgsRest(__VLS_260));
        const { default: __VLS_264 } = __VLS_262.slots;
        let __VLS_265;
        /** @ts-ignore @type {typeof __VLS_components.TrendCharts} */
        TrendCharts;
        // @ts-ignore
        const __VLS_266 = __VLS_asFunctionalComponent1(__VLS_265, new __VLS_265({}));
        const __VLS_267 = __VLS_266({}, ...__VLS_functionalComponentArgsRest(__VLS_266));
        // @ts-ignore
        [dialogWidth, dialogVisible, jobMatchResult,];
        var __VLS_262;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "match-result" },
    });
    /** @type {__VLS_StyleScopedClasses['match-result']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "match-score-section" },
    });
    /** @type {__VLS_StyleScopedClasses['match-score-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-display" },
    });
    /** @type {__VLS_StyleScopedClasses['score-display']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-number" },
    });
    /** @type {__VLS_StyleScopedClasses['score-number']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "number" },
    });
    /** @type {__VLS_StyleScopedClasses['number']} */ ;
    (__VLS_ctx.jobMatchResult.match_score);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "unit" },
    });
    /** @type {__VLS_StyleScopedClasses['unit']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-info" },
    });
    /** @type {__VLS_StyleScopedClasses['score-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    (__VLS_ctx.jobMatchResult.target_job);
    let __VLS_270;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_271 = __VLS_asFunctionalComponent1(__VLS_270, new __VLS_270({
        type: (__VLS_ctx.getMatchTagType(__VLS_ctx.jobMatchResult.match_score)),
        size: "large",
    }));
    const __VLS_272 = __VLS_271({
        type: (__VLS_ctx.getMatchTagType(__VLS_ctx.jobMatchResult.match_score)),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_271));
    const { default: __VLS_275 } = __VLS_273.slots;
    (__VLS_ctx.getMatchScoreLevel(__VLS_ctx.jobMatchResult.match_score));
    // @ts-ignore
    [jobMatchResult, jobMatchResult, jobMatchResult, jobMatchResult, getMatchTagType, getMatchScoreLevel,];
    var __VLS_273;
    let __VLS_276;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_277 = __VLS_asFunctionalComponent1(__VLS_276, new __VLS_276({}));
    const __VLS_278 = __VLS_277({}, ...__VLS_functionalComponentArgsRest(__VLS_277));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skills-section" },
    });
    /** @type {__VLS_StyleScopedClasses['skills-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skill-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-tags']} */ ;
    for (const [skill, index] of __VLS_vFor((__VLS_ctx.jobMatchResult.matched_skills || []))) {
        let __VLS_281;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_282 = __VLS_asFunctionalComponent1(__VLS_281, new __VLS_281({
            key: (index),
            type: "success",
            ...{ class: "skill-tag" },
        }));
        const __VLS_283 = __VLS_282({
            key: (index),
            type: "success",
            ...{ class: "skill-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_282));
        /** @type {__VLS_StyleScopedClasses['skill-tag']} */ ;
        const { default: __VLS_286 } = __VLS_284.slots;
        (skill);
        // @ts-ignore
        [jobMatchResult,];
        var __VLS_284;
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skills-section" },
    });
    /** @type {__VLS_StyleScopedClasses['skills-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skill-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-tags']} */ ;
    for (const [skill, index] of __VLS_vFor((__VLS_ctx.jobMatchResult.missing_skills || []))) {
        let __VLS_287;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_288 = __VLS_asFunctionalComponent1(__VLS_287, new __VLS_287({
            key: (index),
            type: "danger",
            ...{ class: "skill-tag" },
        }));
        const __VLS_289 = __VLS_288({
            key: (index),
            type: "danger",
            ...{ class: "skill-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_288));
        /** @type {__VLS_StyleScopedClasses['skill-tag']} */ ;
        const { default: __VLS_292 } = __VLS_290.slots;
        (skill);
        // @ts-ignore
        [jobMatchResult,];
        var __VLS_290;
        // @ts-ignore
        [];
    }
    let __VLS_293;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_294 = __VLS_asFunctionalComponent1(__VLS_293, new __VLS_293({}));
    const __VLS_295 = __VLS_294({}, ...__VLS_functionalComponentArgsRest(__VLS_294));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "recommendations-section" },
    });
    /** @type {__VLS_StyleScopedClasses['recommendations-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "recommendation-list" },
    });
    /** @type {__VLS_StyleScopedClasses['recommendation-list']} */ ;
    for (const [rec, index] of __VLS_vFor((__VLS_ctx.jobMatchResult.recommendations || []))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (index),
            ...{ class: "recommendation-item" },
        });
        /** @type {__VLS_StyleScopedClasses['recommendation-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "recommendation-header" },
        });
        /** @type {__VLS_StyleScopedClasses['recommendation-header']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
        (rec.job_title);
        let __VLS_298;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({
            type: (__VLS_ctx.getMatchTagType(rec.match_score)),
        }));
        const __VLS_300 = __VLS_299({
            type: (__VLS_ctx.getMatchTagType(rec.match_score)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_299));
        const { default: __VLS_303 } = __VLS_301.slots;
        (rec.match_score);
        // @ts-ignore
        [jobMatchResult, getMatchTagType,];
        var __VLS_301;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "recommendation-reason" },
        });
        /** @type {__VLS_StyleScopedClasses['recommendation-reason']} */ ;
        (rec.reason);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "requirements-tags" },
        });
        /** @type {__VLS_StyleScopedClasses['requirements-tags']} */ ;
        for (const [req, idx] of __VLS_vFor((rec.key_requirements || []))) {
            let __VLS_304;
            /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
            elTag;
            // @ts-ignore
            const __VLS_305 = __VLS_asFunctionalComponent1(__VLS_304, new __VLS_304({
                key: (idx),
                size: "small",
                type: "info",
            }));
            const __VLS_306 = __VLS_305({
                key: (idx),
                size: "small",
                type: "info",
            }, ...__VLS_functionalComponentArgsRest(__VLS_305));
            const { default: __VLS_309 } = __VLS_307.slots;
            (req);
            // @ts-ignore
            [];
            var __VLS_307;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
    }
    let __VLS_310;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_311 = __VLS_asFunctionalComponent1(__VLS_310, new __VLS_310({}));
    const __VLS_312 = __VLS_311({}, ...__VLS_functionalComponentArgsRest(__VLS_311));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "optimization-section" },
    });
    /** @type {__VLS_StyleScopedClasses['optimization-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    let __VLS_315;
    /** @ts-ignore @type {typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline} */
    elTimeline;
    // @ts-ignore
    const __VLS_316 = __VLS_asFunctionalComponent1(__VLS_315, new __VLS_315({}));
    const __VLS_317 = __VLS_316({}, ...__VLS_functionalComponentArgsRest(__VLS_316));
    const { default: __VLS_320 } = __VLS_318.slots;
    for (const [suggestion, index] of __VLS_vFor((__VLS_ctx.jobMatchResult.optimization_suggestions || []))) {
        let __VLS_321;
        /** @ts-ignore @type {typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem} */
        elTimelineItem;
        // @ts-ignore
        const __VLS_322 = __VLS_asFunctionalComponent1(__VLS_321, new __VLS_321({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
            color: "#67C23A",
        }));
        const __VLS_323 = __VLS_322({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
            color: "#67C23A",
        }, ...__VLS_functionalComponentArgsRest(__VLS_322));
        const { default: __VLS_326 } = __VLS_324.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "suggestion-item" },
        });
        /** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
        (suggestion.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (suggestion.content);
        // @ts-ignore
        [jobMatchResult,];
        var __VLS_324;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_318;
    // @ts-ignore
    [];
    var __VLS_255;
}
{
    const { footer: __VLS_327 } = __VLS_249.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_328;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_329 = __VLS_asFunctionalComponent1(__VLS_328, new __VLS_328({
        ...{ 'onClick': {} },
    }));
    const __VLS_330 = __VLS_329({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_329));
    let __VLS_333;
    const __VLS_334 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_335 } = __VLS_331.slots;
    // @ts-ignore
    [];
    var __VLS_331;
    var __VLS_332;
    let __VLS_336;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_337 = __VLS_asFunctionalComponent1(__VLS_336, new __VLS_336({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_338 = __VLS_337({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_337));
    let __VLS_341;
    const __VLS_342 = ({ click: {} },
        { onClick: (__VLS_ctx.exportRecommendation) });
    const { default: __VLS_343 } = __VLS_339.slots;
    let __VLS_344;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_345 = __VLS_asFunctionalComponent1(__VLS_344, new __VLS_344({}));
    const __VLS_346 = __VLS_345({}, ...__VLS_functionalComponentArgsRest(__VLS_345));
    const { default: __VLS_349 } = __VLS_347.slots;
    let __VLS_350;
    /** @ts-ignore @type {typeof __VLS_components.Download} */
    Download;
    // @ts-ignore
    const __VLS_351 = __VLS_asFunctionalComponent1(__VLS_350, new __VLS_350({}));
    const __VLS_352 = __VLS_351({}, ...__VLS_functionalComponentArgsRest(__VLS_351));
    // @ts-ignore
    [exportRecommendation,];
    var __VLS_347;
    // @ts-ignore
    [];
    var __VLS_339;
    var __VLS_340;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_249;
if (__VLS_ctx.jobMatchResult) {
    let __VLS_355;
    /** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
    elRow;
    // @ts-ignore
    const __VLS_356 = __VLS_asFunctionalComponent1(__VLS_355, new __VLS_355({
        gutter: (20),
    }));
    const __VLS_357 = __VLS_356({
        gutter: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_356));
    const { default: __VLS_360 } = __VLS_358.slots;
    let __VLS_361;
    /** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    const __VLS_362 = __VLS_asFunctionalComponent1(__VLS_361, new __VLS_361({
        span: (24),
    }));
    const __VLS_363 = __VLS_362({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_362));
    const { default: __VLS_366 } = __VLS_364.slots;
    let __VLS_367;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_368 = __VLS_asFunctionalComponent1(__VLS_367, new __VLS_367({
        ...{ 'onClick': {} },
        ...{ class: "job-result-card" },
        shadow: "hover",
    }));
    const __VLS_369 = __VLS_368({
        ...{ 'onClick': {} },
        ...{ class: "job-result-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_368));
    let __VLS_372;
    const __VLS_373 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.jobMatchResult))
                    return;
                __VLS_ctx.dialogVisible = true;
                // @ts-ignore
                [dialogVisible, jobMatchResult,];
            } });
    /** @type {__VLS_StyleScopedClasses['job-result-card']} */ ;
    const { default: __VLS_374 } = __VLS_370.slots;
    {
        const { header: __VLS_375 } = __VLS_370.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-header" },
        });
        /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
        let __VLS_376;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_377 = __VLS_asFunctionalComponent1(__VLS_376, new __VLS_376({
            size: (24),
            color: "#E6A23C",
        }));
        const __VLS_378 = __VLS_377({
            size: (24),
            color: "#E6A23C",
        }, ...__VLS_functionalComponentArgsRest(__VLS_377));
        const { default: __VLS_381 } = __VLS_379.slots;
        let __VLS_382;
        /** @ts-ignore @type {typeof __VLS_components.TrendCharts} */
        TrendCharts;
        // @ts-ignore
        const __VLS_383 = __VLS_asFunctionalComponent1(__VLS_382, new __VLS_382({}));
        const __VLS_384 = __VLS_383({}, ...__VLS_functionalComponentArgsRest(__VLS_383));
        // @ts-ignore
        [];
        var __VLS_379;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        let __VLS_387;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_388 = __VLS_asFunctionalComponent1(__VLS_387, new __VLS_387({
            type: "info",
            size: "small",
            ...{ style: {} },
        }));
        const __VLS_389 = __VLS_388({
            type: "info",
            size: "small",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_388));
        const { default: __VLS_392 } = __VLS_390.slots;
        // @ts-ignore
        [];
        var __VLS_390;
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "job-result-summary" },
    });
    /** @type {__VLS_StyleScopedClasses['job-result-summary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "result-header" },
    });
    /** @type {__VLS_StyleScopedClasses['result-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-display" },
    });
    /** @type {__VLS_StyleScopedClasses['score-display']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-number" },
    });
    /** @type {__VLS_StyleScopedClasses['score-number']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "number" },
    });
    /** @type {__VLS_StyleScopedClasses['number']} */ ;
    (__VLS_ctx.jobMatchResult.match_score);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "unit" },
    });
    /** @type {__VLS_StyleScopedClasses['unit']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-info" },
    });
    /** @type {__VLS_StyleScopedClasses['score-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    (__VLS_ctx.jobMatchResult.target_job);
    let __VLS_393;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_394 = __VLS_asFunctionalComponent1(__VLS_393, new __VLS_393({
        type: (__VLS_ctx.getMatchTagType(__VLS_ctx.jobMatchResult.match_score)),
    }));
    const __VLS_395 = __VLS_394({
        type: (__VLS_ctx.getMatchTagType(__VLS_ctx.jobMatchResult.match_score)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_394));
    const { default: __VLS_398 } = __VLS_396.slots;
    (__VLS_ctx.getMatchScoreLevel(__VLS_ctx.jobMatchResult.match_score));
    // @ts-ignore
    [jobMatchResult, jobMatchResult, jobMatchResult, jobMatchResult, getMatchTagType, getMatchScoreLevel,];
    var __VLS_396;
    let __VLS_399;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_400 = __VLS_asFunctionalComponent1(__VLS_399, new __VLS_399({}));
    const __VLS_401 = __VLS_400({}, ...__VLS_functionalComponentArgsRest(__VLS_400));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "result-skills" },
    });
    /** @type {__VLS_StyleScopedClasses['result-skills']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skill-section" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
    ((__VLS_ctx.jobMatchResult.matched_skills || []).length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skill-tags-mini" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-tags-mini']} */ ;
    for (const [skill, index] of __VLS_vFor(((__VLS_ctx.jobMatchResult.matched_skills || []).slice(0, 5)))) {
        let __VLS_404;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_405 = __VLS_asFunctionalComponent1(__VLS_404, new __VLS_404({
            key: (index),
            type: "success",
            size: "small",
        }));
        const __VLS_406 = __VLS_405({
            key: (index),
            type: "success",
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_405));
        const { default: __VLS_409 } = __VLS_407.slots;
        (skill);
        // @ts-ignore
        [jobMatchResult, jobMatchResult,];
        var __VLS_407;
        // @ts-ignore
        [];
    }
    if ((__VLS_ctx.jobMatchResult.matched_skills || []).length > 5) {
        let __VLS_410;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_411 = __VLS_asFunctionalComponent1(__VLS_410, new __VLS_410({
            size: "small",
            type: "info",
        }));
        const __VLS_412 = __VLS_411({
            size: "small",
            type: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_411));
        const { default: __VLS_415 } = __VLS_413.slots;
        ((__VLS_ctx.jobMatchResult.matched_skills || []).length - 5);
        // @ts-ignore
        [jobMatchResult, jobMatchResult,];
        var __VLS_413;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skill-section" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
    ((__VLS_ctx.jobMatchResult.missing_skills || []).length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "skill-tags-mini" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-tags-mini']} */ ;
    for (const [skill, index] of __VLS_vFor(((__VLS_ctx.jobMatchResult.missing_skills || []).slice(0, 5)))) {
        let __VLS_416;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_417 = __VLS_asFunctionalComponent1(__VLS_416, new __VLS_416({
            key: (index),
            type: "danger",
            size: "small",
        }));
        const __VLS_418 = __VLS_417({
            key: (index),
            type: "danger",
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_417));
        const { default: __VLS_421 } = __VLS_419.slots;
        (skill);
        // @ts-ignore
        [jobMatchResult, jobMatchResult,];
        var __VLS_419;
        // @ts-ignore
        [];
    }
    if ((__VLS_ctx.jobMatchResult.missing_skills || []).length > 5) {
        let __VLS_422;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_423 = __VLS_asFunctionalComponent1(__VLS_422, new __VLS_422({
            size: "small",
            type: "info",
        }));
        const __VLS_424 = __VLS_423({
            size: "small",
            type: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_423));
        const { default: __VLS_427 } = __VLS_425.slots;
        ((__VLS_ctx.jobMatchResult.missing_skills || []).length - 5);
        // @ts-ignore
        [jobMatchResult, jobMatchResult,];
        var __VLS_425;
    }
    let __VLS_428;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_429 = __VLS_asFunctionalComponent1(__VLS_428, new __VLS_428({}));
    const __VLS_430 = __VLS_429({}, ...__VLS_functionalComponentArgsRest(__VLS_429));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "result-recommendations" },
    });
    /** @type {__VLS_StyleScopedClasses['result-recommendations']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
    ((__VLS_ctx.jobMatchResult.recommendations || []).length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "recommendation-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['recommendation-tags']} */ ;
    for (const [rec, index] of __VLS_vFor((__VLS_ctx.jobMatchResult.recommendations || []))) {
        let __VLS_433;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_434 = __VLS_asFunctionalComponent1(__VLS_433, new __VLS_433({
            key: (index),
            type: (__VLS_ctx.getMatchTagType(rec.match_score)),
            size: "small",
        }));
        const __VLS_435 = __VLS_434({
            key: (index),
            type: (__VLS_ctx.getMatchTagType(rec.match_score)),
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_434));
        const { default: __VLS_438 } = __VLS_436.slots;
        (rec.job_title);
        (rec.match_score);
        // @ts-ignore
        [jobMatchResult, jobMatchResult, getMatchTagType,];
        var __VLS_436;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_370;
    var __VLS_371;
    // @ts-ignore
    [];
    var __VLS_364;
    // @ts-ignore
    [];
    var __VLS_358;
}
if (!__VLS_ctx.hasResumeData && !__VLS_ctx.jobMatchResult) {
    let __VLS_439;
    /** @ts-ignore @type {typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty} */
    elEmpty;
    // @ts-ignore
    const __VLS_440 = __VLS_asFunctionalComponent1(__VLS_439, new __VLS_439({
        description: "暂无简历数据，请先上传并分析简历",
        imageSize: (200),
    }));
    const __VLS_441 = __VLS_440({
        description: "暂无简历数据，请先上传并分析简历",
        imageSize: (200),
    }, ...__VLS_functionalComponentArgsRest(__VLS_440));
    const { default: __VLS_444 } = __VLS_442.slots;
    let __VLS_445;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_446 = __VLS_asFunctionalComponent1(__VLS_445, new __VLS_445({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_447 = __VLS_446({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_446));
    let __VLS_450;
    const __VLS_451 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.hasResumeData && !__VLS_ctx.jobMatchResult))
                    return;
                __VLS_ctx.$router.push('/resume-analyze');
                // @ts-ignore
                [hasResumeData, jobMatchResult, $router,];
            } });
    const { default: __VLS_452 } = __VLS_448.slots;
    // @ts-ignore
    [];
    var __VLS_448;
    var __VLS_449;
    // @ts-ignore
    [];
    var __VLS_442;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
