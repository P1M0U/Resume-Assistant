import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useResumeAnalysis } from '@/composables/useResumeAnalysis';
const fileInputRef = ref(null);
const windowWidth = ref(window.innerWidth);
const { uploadedFile, analyzing, analysisResult, dialogVisible, handleUploadClick, handleFileChange, handleDrop, handleAnalyze, formatFileSize, getScoreLevel, } = useResumeAnalysis(fileInputRef);
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
 * 导出报告
 */
const exportReport = () => {
    if (!analysisResult.value)
        return;
    const report = {
        score: analysisResult.value.score,
        personal_info: analysisResult.value.personal_info,
        highlights: analysisResult.value.highlights,
        issues: analysisResult.value.issues,
        suggestions: analysisResult.value.suggestions,
        export_time: new Date().toLocaleString(),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `简历分析报告_${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
    ...{ class: "resume-analysis-view" },
});
/** @type {__VLS_StyleScopedClasses['resume-analysis-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleFileChange) },
    ref: "fileInputRef",
    type: "file",
    accept: ".pdf,.docx",
    ...{ style: {} },
});
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
    ...{ class: "upload-card" },
    shadow: "hover",
}));
const __VLS_14 = __VLS_13({
    ...{ class: "upload-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['upload-card']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleUploadClick) },
    ...{ onDragover: () => { } },
    ...{ onDrop: (__VLS_ctx.handleDrop) },
    ...{ class: "upload-area" },
});
/** @type {__VLS_StyleScopedClasses['upload-area']} */ ;
let __VLS_18;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    size: (60),
    color: "#409EFF",
}));
const __VLS_20 = __VLS_19({
    size: (60),
    color: "#409EFF",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type {typeof __VLS_components.Upload} */
Upload;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
// @ts-ignore
[handleFileChange, handleUploadClick, handleDrop,];
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
// @ts-ignore
[];
var __VLS_15;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.uploadedFile) {
    let __VLS_29;
    /** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
    elRow;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        gutter: (20),
    }));
    const __VLS_31 = __VLS_30({
        gutter: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_34 } = __VLS_32.slots;
    let __VLS_35;
    /** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        span: (24),
    }));
    const __VLS_37 = __VLS_36({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const { default: __VLS_40 } = __VLS_38.slots;
    let __VLS_41;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        ...{ class: "file-info-card" },
        shadow: "hover",
    }));
    const __VLS_43 = __VLS_42({
        ...{ class: "file-info-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    /** @type {__VLS_StyleScopedClasses['file-info-card']} */ ;
    const { default: __VLS_46 } = __VLS_44.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "file-info" },
    });
    /** @type {__VLS_StyleScopedClasses['file-info']} */ ;
    let __VLS_47;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        size: (40),
        color: "#67C23A",
    }));
    const __VLS_49 = __VLS_48({
        size: (40),
        color: "#67C23A",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    const { default: __VLS_52 } = __VLS_50.slots;
    let __VLS_53;
    /** @ts-ignore @type {typeof __VLS_components.Document} */
    Document;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({}));
    const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
    // @ts-ignore
    [uploadedFile,];
    var __VLS_50;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "file-details" },
    });
    /** @type {__VLS_StyleScopedClasses['file-details']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    (__VLS_ctx.uploadedFile.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.formatFileSize(__VLS_ctx.uploadedFile.size));
    let __VLS_58;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.analyzing),
    }));
    const __VLS_60 = __VLS_59({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.analyzing),
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    let __VLS_63;
    const __VLS_64 = ({ click: {} },
        { onClick: (__VLS_ctx.handleAnalyze) });
    const { default: __VLS_65 } = __VLS_61.slots;
    (__VLS_ctx.analyzing ? '分析中...' : '开始分析');
    // @ts-ignore
    [uploadedFile, uploadedFile, formatFileSize, analyzing, analyzing, handleAnalyze,];
    var __VLS_61;
    var __VLS_62;
    // @ts-ignore
    [];
    var __VLS_44;
    // @ts-ignore
    [];
    var __VLS_38;
    // @ts-ignore
    [];
    var __VLS_32;
}
if (__VLS_ctx.analysisResult) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "analysis-result" },
    });
    /** @type {__VLS_StyleScopedClasses['analysis-result']} */ ;
    let __VLS_66;
    /** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
    elRow;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        gutter: (20),
    }));
    const __VLS_68 = __VLS_67({
        gutter: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const { default: __VLS_71 } = __VLS_69.slots;
    let __VLS_72;
    /** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        span: (24),
    }));
    const __VLS_74 = __VLS_73({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    const { default: __VLS_77 } = __VLS_75.slots;
    let __VLS_78;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
        ...{ class: "result-card" },
        shadow: "hover",
    }));
    const __VLS_80 = __VLS_79({
        ...{ class: "result-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_79));
    /** @type {__VLS_StyleScopedClasses['result-card']} */ ;
    const { default: __VLS_83 } = __VLS_81.slots;
    {
        const { header: __VLS_84 } = __VLS_81.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-header" },
        });
        /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
        let __VLS_85;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
            size: (24),
            color: "#409EFF",
        }));
        const __VLS_87 = __VLS_86({
            size: (24),
            color: "#409EFF",
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
        const { default: __VLS_90 } = __VLS_88.slots;
        let __VLS_91;
        /** @ts-ignore @type {typeof __VLS_components.DataAnalysis} */
        DataAnalysis;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({}));
        const __VLS_93 = __VLS_92({}, ...__VLS_functionalComponentArgsRest(__VLS_92));
        // @ts-ignore
        [analysisResult,];
        var __VLS_88;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "result-content" },
    });
    /** @type {__VLS_StyleScopedClasses['result-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-section" },
    });
    /** @type {__VLS_StyleScopedClasses['score-section']} */ ;
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
    (__VLS_ctx.analysisResult.score);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "unit" },
    });
    /** @type {__VLS_StyleScopedClasses['unit']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-level" },
    });
    /** @type {__VLS_StyleScopedClasses['score-level']} */ ;
    let __VLS_96;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.analysisResult.score)),
        size: "large",
    }));
    const __VLS_98 = __VLS_97({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.analysisResult.score)),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    const { default: __VLS_101 } = __VLS_99.slots;
    (__VLS_ctx.getScoreLevel(__VLS_ctx.analysisResult.score));
    // @ts-ignore
    [analysisResult, analysisResult, analysisResult, getScoreTagType, getScoreLevel,];
    var __VLS_99;
    let __VLS_102;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({}));
    const __VLS_104 = __VLS_103({}, ...__VLS_functionalComponentArgsRest(__VLS_103));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-section" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    for (const [highlight, index] of __VLS_vFor((__VLS_ctx.analysisResult.highlights))) {
        let __VLS_107;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
            key: (index),
            type: "success",
            ...{ class: "tag-item" },
        }));
        const __VLS_109 = __VLS_108({
            key: (index),
            type: "success",
            ...{ class: "tag-item" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_108));
        /** @type {__VLS_StyleScopedClasses['tag-item']} */ ;
        const { default: __VLS_112 } = __VLS_110.slots;
        (highlight);
        // @ts-ignore
        [analysisResult,];
        var __VLS_110;
        // @ts-ignore
        [];
    }
    let __VLS_113;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({}));
    const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-section" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    for (const [issue, index] of __VLS_vFor((__VLS_ctx.analysisResult.issues))) {
        let __VLS_118;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
            key: (index),
            type: "warning",
            ...{ class: "tag-item" },
        }));
        const __VLS_120 = __VLS_119({
            key: (index),
            type: "warning",
            ...{ class: "tag-item" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_119));
        /** @type {__VLS_StyleScopedClasses['tag-item']} */ ;
        const { default: __VLS_123 } = __VLS_121.slots;
        (issue);
        // @ts-ignore
        [analysisResult,];
        var __VLS_121;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_81;
    // @ts-ignore
    [];
    var __VLS_75;
    // @ts-ignore
    [];
    var __VLS_69;
    let __VLS_124;
    /** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
    elRow;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
        gutter: (20),
        ...{ class: "suggestions-row" },
    }));
    const __VLS_126 = __VLS_125({
        gutter: (20),
        ...{ class: "suggestions-row" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_125));
    /** @type {__VLS_StyleScopedClasses['suggestions-row']} */ ;
    const { default: __VLS_129 } = __VLS_127.slots;
    let __VLS_130;
    /** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
        span: (24),
    }));
    const __VLS_132 = __VLS_131({
        span: (24),
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    const { default: __VLS_135 } = __VLS_133.slots;
    let __VLS_136;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
        ...{ class: "suggestions-card" },
        shadow: "hover",
    }));
    const __VLS_138 = __VLS_137({
        ...{ class: "suggestions-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    /** @type {__VLS_StyleScopedClasses['suggestions-card']} */ ;
    const { default: __VLS_141 } = __VLS_139.slots;
    {
        const { header: __VLS_142 } = __VLS_139.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-header" },
        });
        /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
        let __VLS_143;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({
            size: (24),
            color: "#67C23A",
        }));
        const __VLS_145 = __VLS_144({
            size: (24),
            color: "#67C23A",
        }, ...__VLS_functionalComponentArgsRest(__VLS_144));
        const { default: __VLS_148 } = __VLS_146.slots;
        let __VLS_149;
        /** @ts-ignore @type {typeof __VLS_components.MagicStick} */
        MagicStick;
        // @ts-ignore
        const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({}));
        const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
        // @ts-ignore
        [];
        var __VLS_146;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        // @ts-ignore
        [];
    }
    let __VLS_154;
    /** @ts-ignore @type {typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline} */
    elTimeline;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({}));
    const __VLS_156 = __VLS_155({}, ...__VLS_functionalComponentArgsRest(__VLS_155));
    const { default: __VLS_159 } = __VLS_157.slots;
    for (const [suggestion, index] of __VLS_vFor((__VLS_ctx.analysisResult.suggestions))) {
        let __VLS_160;
        /** @ts-ignore @type {typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem} */
        elTimelineItem;
        // @ts-ignore
        const __VLS_161 = __VLS_asFunctionalComponent1(__VLS_160, new __VLS_160({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
        }));
        const __VLS_162 = __VLS_161({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_161));
        const { default: __VLS_165 } = __VLS_163.slots;
        let __VLS_166;
        /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
        elCard;
        // @ts-ignore
        const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
            ...{ class: "suggestion-item" },
        }));
        const __VLS_168 = __VLS_167({
            ...{ class: "suggestion-item" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_167));
        /** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
        const { default: __VLS_171 } = __VLS_169.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (suggestion.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (suggestion.content);
        // @ts-ignore
        [analysisResult,];
        var __VLS_169;
        // @ts-ignore
        [];
        var __VLS_163;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_157;
    // @ts-ignore
    [];
    var __VLS_139;
    // @ts-ignore
    [];
    var __VLS_133;
    // @ts-ignore
    [];
    var __VLS_127;
}
let __VLS_172;
/** @ts-ignore @type {typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "AI简历分析报告",
    width: (__VLS_ctx.dialogWidth),
    closeOnClickModal: (false),
}));
const __VLS_174 = __VLS_173({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "AI简历分析报告",
    width: (__VLS_ctx.dialogWidth),
    closeOnClickModal: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_173));
const { default: __VLS_177 } = __VLS_175.slots;
if (__VLS_ctx.analysisResult) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ai-dialog-content" },
    });
    /** @type {__VLS_StyleScopedClasses['ai-dialog-content']} */ ;
    let __VLS_178;
    /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({
        ...{ class: "dialog-card" },
        shadow: "never",
    }));
    const __VLS_180 = __VLS_179({
        ...{ class: "dialog-card" },
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_179));
    /** @type {__VLS_StyleScopedClasses['dialog-card']} */ ;
    const { default: __VLS_183 } = __VLS_181.slots;
    {
        const { header: __VLS_184 } = __VLS_181.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dialog-header" },
        });
        /** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
        let __VLS_185;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
            size: (24),
            color: "#409EFF",
        }));
        const __VLS_187 = __VLS_186({
            size: (24),
            color: "#409EFF",
        }, ...__VLS_functionalComponentArgsRest(__VLS_186));
        const { default: __VLS_190 } = __VLS_188.slots;
        let __VLS_191;
        /** @ts-ignore @type {typeof __VLS_components.ChatDotRound} */
        ChatDotRound;
        // @ts-ignore
        const __VLS_192 = __VLS_asFunctionalComponent1(__VLS_191, new __VLS_191({}));
        const __VLS_193 = __VLS_192({}, ...__VLS_functionalComponentArgsRest(__VLS_192));
        // @ts-ignore
        [analysisResult, dialogVisible, dialogWidth,];
        var __VLS_188;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        // @ts-ignore
        [];
    }
    let __VLS_196;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions} */
    elDescriptions;
    // @ts-ignore
    const __VLS_197 = __VLS_asFunctionalComponent1(__VLS_196, new __VLS_196({
        column: (__VLS_ctx.descriptionColumn),
        border: true,
    }));
    const __VLS_198 = __VLS_197({
        column: (__VLS_ctx.descriptionColumn),
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_197));
    const { default: __VLS_201 } = __VLS_199.slots;
    let __VLS_202;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_203 = __VLS_asFunctionalComponent1(__VLS_202, new __VLS_202({
        label: "综合评分",
    }));
    const __VLS_204 = __VLS_203({
        label: "综合评分",
    }, ...__VLS_functionalComponentArgsRest(__VLS_203));
    const { default: __VLS_207 } = __VLS_205.slots;
    let __VLS_208;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_209 = __VLS_asFunctionalComponent1(__VLS_208, new __VLS_208({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.analysisResult.score)),
        size: "large",
    }));
    const __VLS_210 = __VLS_209({
        type: (__VLS_ctx.getScoreTagType(__VLS_ctx.analysisResult.score)),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_209));
    const { default: __VLS_213 } = __VLS_211.slots;
    (__VLS_ctx.analysisResult.score);
    (__VLS_ctx.getScoreLevel(__VLS_ctx.analysisResult.score));
    // @ts-ignore
    [analysisResult, analysisResult, analysisResult, getScoreTagType, getScoreLevel, descriptionColumn,];
    var __VLS_211;
    // @ts-ignore
    [];
    var __VLS_205;
    let __VLS_214;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_215 = __VLS_asFunctionalComponent1(__VLS_214, new __VLS_214({
        label: "姓名",
    }));
    const __VLS_216 = __VLS_215({
        label: "姓名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_215));
    const { default: __VLS_219 } = __VLS_217.slots;
    (__VLS_ctx.analysisResult.personal_info?.name || '未识别');
    // @ts-ignore
    [analysisResult,];
    var __VLS_217;
    let __VLS_220;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_221 = __VLS_asFunctionalComponent1(__VLS_220, new __VLS_220({
        label: "电话",
    }));
    const __VLS_222 = __VLS_221({
        label: "电话",
    }, ...__VLS_functionalComponentArgsRest(__VLS_221));
    const { default: __VLS_225 } = __VLS_223.slots;
    (__VLS_ctx.analysisResult.personal_info?.phone || '未识别');
    // @ts-ignore
    [analysisResult,];
    var __VLS_223;
    let __VLS_226;
    /** @ts-ignore @type {typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_227 = __VLS_asFunctionalComponent1(__VLS_226, new __VLS_226({
        label: "邮箱",
    }));
    const __VLS_228 = __VLS_227({
        label: "邮箱",
    }, ...__VLS_functionalComponentArgsRest(__VLS_227));
    const { default: __VLS_231 } = __VLS_229.slots;
    (__VLS_ctx.analysisResult.personal_info?.email || '未识别');
    // @ts-ignore
    [analysisResult,];
    var __VLS_229;
    // @ts-ignore
    [];
    var __VLS_199;
    let __VLS_232;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_233 = __VLS_asFunctionalComponent1(__VLS_232, new __VLS_232({
        contentPosition: "left",
    }));
    const __VLS_234 = __VLS_233({
        contentPosition: "left",
    }, ...__VLS_functionalComponentArgsRest(__VLS_233));
    const { default: __VLS_237 } = __VLS_235.slots;
    // @ts-ignore
    [];
    var __VLS_235;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "highlight-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['highlight-tags']} */ ;
    for (const [highlight, index] of __VLS_vFor((__VLS_ctx.analysisResult.highlights))) {
        let __VLS_238;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_239 = __VLS_asFunctionalComponent1(__VLS_238, new __VLS_238({
            key: (index),
            type: "success",
            effect: "dark",
            ...{ class: "result-tag" },
        }));
        const __VLS_240 = __VLS_239({
            key: (index),
            type: "success",
            effect: "dark",
            ...{ class: "result-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_239));
        /** @type {__VLS_StyleScopedClasses['result-tag']} */ ;
        const { default: __VLS_243 } = __VLS_241.slots;
        (highlight);
        // @ts-ignore
        [analysisResult,];
        var __VLS_241;
        // @ts-ignore
        [];
    }
    let __VLS_244;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_245 = __VLS_asFunctionalComponent1(__VLS_244, new __VLS_244({
        contentPosition: "left",
    }));
    const __VLS_246 = __VLS_245({
        contentPosition: "left",
    }, ...__VLS_functionalComponentArgsRest(__VLS_245));
    const { default: __VLS_249 } = __VLS_247.slots;
    // @ts-ignore
    [];
    var __VLS_247;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "issue-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['issue-tags']} */ ;
    for (const [issue, index] of __VLS_vFor((__VLS_ctx.analysisResult.issues))) {
        let __VLS_250;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_251 = __VLS_asFunctionalComponent1(__VLS_250, new __VLS_250({
            key: (index),
            type: "warning",
            effect: "dark",
            ...{ class: "result-tag" },
        }));
        const __VLS_252 = __VLS_251({
            key: (index),
            type: "warning",
            effect: "dark",
            ...{ class: "result-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_251));
        /** @type {__VLS_StyleScopedClasses['result-tag']} */ ;
        const { default: __VLS_255 } = __VLS_253.slots;
        (issue);
        // @ts-ignore
        [analysisResult,];
        var __VLS_253;
        // @ts-ignore
        [];
    }
    let __VLS_256;
    /** @ts-ignore @type {typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    const __VLS_257 = __VLS_asFunctionalComponent1(__VLS_256, new __VLS_256({
        contentPosition: "left",
    }));
    const __VLS_258 = __VLS_257({
        contentPosition: "left",
    }, ...__VLS_functionalComponentArgsRest(__VLS_257));
    const { default: __VLS_261 } = __VLS_259.slots;
    // @ts-ignore
    [];
    var __VLS_259;
    let __VLS_262;
    /** @ts-ignore @type {typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline} */
    elTimeline;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent1(__VLS_262, new __VLS_262({}));
    const __VLS_264 = __VLS_263({}, ...__VLS_functionalComponentArgsRest(__VLS_263));
    const { default: __VLS_267 } = __VLS_265.slots;
    for (const [suggestion, index] of __VLS_vFor((__VLS_ctx.analysisResult.suggestions))) {
        let __VLS_268;
        /** @ts-ignore @type {typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem} */
        elTimelineItem;
        // @ts-ignore
        const __VLS_269 = __VLS_asFunctionalComponent1(__VLS_268, new __VLS_268({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
            color: "#67C23A",
        }));
        const __VLS_270 = __VLS_269({
            key: (index),
            timestamp: (suggestion.category),
            placement: "top",
            color: "#67C23A",
        }, ...__VLS_functionalComponentArgsRest(__VLS_269));
        const { default: __VLS_273 } = __VLS_271.slots;
        let __VLS_274;
        /** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
        elCard;
        // @ts-ignore
        const __VLS_275 = __VLS_asFunctionalComponent1(__VLS_274, new __VLS_274({
            ...{ class: "suggestion-card" },
        }));
        const __VLS_276 = __VLS_275({
            ...{ class: "suggestion-card" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_275));
        /** @type {__VLS_StyleScopedClasses['suggestion-card']} */ ;
        const { default: __VLS_279 } = __VLS_277.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (suggestion.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (suggestion.content);
        // @ts-ignore
        [analysisResult,];
        var __VLS_277;
        // @ts-ignore
        [];
        var __VLS_271;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_265;
    // @ts-ignore
    [];
    var __VLS_181;
}
{
    const { footer: __VLS_280 } = __VLS_175.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_281;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_282 = __VLS_asFunctionalComponent1(__VLS_281, new __VLS_281({
        ...{ 'onClick': {} },
    }));
    const __VLS_283 = __VLS_282({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_282));
    let __VLS_286;
    const __VLS_287 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_288 } = __VLS_284.slots;
    // @ts-ignore
    [];
    var __VLS_284;
    var __VLS_285;
    let __VLS_289;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_290 = __VLS_asFunctionalComponent1(__VLS_289, new __VLS_289({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_291 = __VLS_290({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_290));
    let __VLS_294;
    const __VLS_295 = ({ click: {} },
        { onClick: (__VLS_ctx.exportReport) });
    const { default: __VLS_296 } = __VLS_292.slots;
    // @ts-ignore
    [exportReport,];
    var __VLS_292;
    var __VLS_293;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_175;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
