import { ChatDotRound, Delete, Promotion } from '@element-plus/icons-vue';
import { useAiChat } from '@/composables/useAiChat';
const { messages, inputMessage, isLoading, userInitial, quickQuestions, sendMessage, handleQuickQuestion, clearChat, } = useAiChat();
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ai-chat-view" },
});
/** @type {__VLS_StyleScopedClasses['ai-chat-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-container" },
});
/** @type {__VLS_StyleScopedClasses['chat-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-header" },
});
/** @type {__VLS_StyleScopedClasses['chat-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "subtitle" },
});
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-messages" },
});
/** @type {__VLS_StyleScopedClasses['chat-messages']} */ ;
for (const [message, index] of __VLS_vFor((__VLS_ctx.messages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (index),
        ...{ class: (['message', message.role]) },
    });
    /** @type {__VLS_StyleScopedClasses['message']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-avatar" },
    });
    /** @type {__VLS_StyleScopedClasses['message-avatar']} */ ;
    if (message.role === 'user') {
        let __VLS_0;
        /** @ts-ignore @type {typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar} */
        elAvatar;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            size: (36),
        }));
        const __VLS_2 = __VLS_1({
            size: (36),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const { default: __VLS_5 } = __VLS_3.slots;
        (__VLS_ctx.userInitial);
        // @ts-ignore
        [messages, userInitial,];
        var __VLS_3;
    }
    else {
        let __VLS_6;
        /** @ts-ignore @type {typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar} */
        elAvatar;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            size: (36),
            ...{ class: "ai-avatar" },
        }));
        const __VLS_8 = __VLS_7({
            size: (36),
            ...{ class: "ai-avatar" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        /** @type {__VLS_StyleScopedClasses['ai-avatar']} */ ;
        const { default: __VLS_11 } = __VLS_9.slots;
        let __VLS_12;
        /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        const { default: __VLS_17 } = __VLS_15.slots;
        let __VLS_18;
        /** @ts-ignore @type {typeof __VLS_components.ChatDotRound} */
        ChatDotRound;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
        const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
        // @ts-ignore
        [];
        var __VLS_15;
        // @ts-ignore
        [];
        var __VLS_9;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-content" },
    });
    /** @type {__VLS_StyleScopedClasses['message-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-text" },
    });
    /** @type {__VLS_StyleScopedClasses['message-text']} */ ;
    (message.content);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-time" },
    });
    /** @type {__VLS_StyleScopedClasses['message-time']} */ ;
    (message.timestamp);
    // @ts-ignore
    [];
}
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message assistant loading" },
    });
    /** @type {__VLS_StyleScopedClasses['message']} */ ;
    /** @type {__VLS_StyleScopedClasses['assistant']} */ ;
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-avatar" },
    });
    /** @type {__VLS_StyleScopedClasses['message-avatar']} */ ;
    let __VLS_23;
    /** @ts-ignore @type {typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar} */
    elAvatar;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        size: (36),
        ...{ class: "ai-avatar" },
    }));
    const __VLS_25 = __VLS_24({
        size: (36),
        ...{ class: "ai-avatar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    /** @type {__VLS_StyleScopedClasses['ai-avatar']} */ ;
    const { default: __VLS_28 } = __VLS_26.slots;
    let __VLS_29;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({}));
    const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_34 } = __VLS_32.slots;
    let __VLS_35;
    /** @ts-ignore @type {typeof __VLS_components.ChatDotRound} */
    ChatDotRound;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({}));
    const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
    // @ts-ignore
    [isLoading,];
    var __VLS_32;
    // @ts-ignore
    [];
    var __VLS_26;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-content" },
    });
    /** @type {__VLS_StyleScopedClasses['message-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "typing-indicator" },
    });
    /** @type {__VLS_StyleScopedClasses['typing-indicator']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-input" },
});
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
let __VLS_40;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.inputMessage),
    type: "textarea",
    rows: (3),
    placeholder: "输入您的问题，例如：如何优化我的简历？",
    disabled: (__VLS_ctx.isLoading),
}));
const __VLS_42 = __VLS_41({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.inputMessage),
    type: "textarea",
    rows: (3),
    placeholder: "输入您的问题，例如：如何优化我的简历？",
    disabled: (__VLS_ctx.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
const __VLS_46 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.sendMessage) });
var __VLS_43;
var __VLS_44;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-actions" },
});
/** @type {__VLS_StyleScopedClasses['input-actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "quick-questions" },
});
/** @type {__VLS_StyleScopedClasses['quick-questions']} */ ;
for (const [question] of __VLS_vFor((__VLS_ctx.quickQuestions))) {
    let __VLS_47;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        ...{ 'onClick': {} },
        key: (question),
        ...{ class: "quick-question" },
        effect: "plain",
    }));
    const __VLS_49 = __VLS_48({
        ...{ 'onClick': {} },
        key: (question),
        ...{ class: "quick-question" },
        effect: "plain",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    let __VLS_52;
    const __VLS_53 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleQuickQuestion(question);
                // @ts-ignore
                [isLoading, inputMessage, sendMessage, quickQuestions, handleQuickQuestion,];
            } });
    /** @type {__VLS_StyleScopedClasses['quick-question']} */ ;
    const { default: __VLS_54 } = __VLS_50.slots;
    (question);
    // @ts-ignore
    [];
    var __VLS_50;
    var __VLS_51;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "action-buttons" },
});
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
let __VLS_55;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.messages.length === 0),
}));
const __VLS_57 = __VLS_56({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.messages.length === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = ({ click: {} },
    { onClick: (__VLS_ctx.clearChat) });
const { default: __VLS_62 } = __VLS_58.slots;
let __VLS_63;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({}));
const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
let __VLS_69;
/** @ts-ignore @type {typeof __VLS_components.Delete} */
Delete;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
// @ts-ignore
[messages, clearChat,];
var __VLS_66;
// @ts-ignore
[];
var __VLS_58;
var __VLS_59;
let __VLS_74;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.isLoading),
}));
const __VLS_76 = __VLS_75({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_79;
const __VLS_80 = ({ click: {} },
    { onClick: (__VLS_ctx.sendMessage) });
const { default: __VLS_81 } = __VLS_77.slots;
let __VLS_82;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({}));
const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_87 } = __VLS_85.slots;
let __VLS_88;
/** @ts-ignore @type {typeof __VLS_components.Promotion} */
Promotion;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({}));
const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
// @ts-ignore
[isLoading, sendMessage,];
var __VLS_85;
// @ts-ignore
[];
var __VLS_77;
var __VLS_78;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
