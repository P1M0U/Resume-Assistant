import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import { useUserStore } from './stores/user';
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const activeMenu = ref('home');
const sidebarVisible = ref(false);
const isMobile = ref(false);
const showLogin = ref(false);
const showRegister = ref(false);
watch(() => route.name, (newName) => {
    if (newName && typeof newName === 'string') {
        activeMenu.value = newName;
    }
}, { immediate: true });
watch(() => userStore.showLoginDialog, (newValue) => {
    if (newValue) {
        showLogin.value = true;
    }
});
/**
 * 计算侧边栏宽度
 */
const sidebarWidth = computed(() => {
    if (isMobile.value) {
        return sidebarVisible.value ? '200px' : '0px';
    }
    return '240px';
});
/**
 * 检测是否为移动端
 */
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
    if (!isMobile.value) {
        sidebarVisible.value = false;
    }
};
/**
 * 切换侧边栏显示状态
 */
const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value;
};
/**
 * 处理菜单选择事件
 */
const handleMenuSelect = (index) => {
    activeMenu.value = index;
    router.push({ name: index });
    // 移动端选择菜单后自动关闭侧边栏
    if (isMobile.value) {
        sidebarVisible.value = false;
    }
};
/**
 * 处理登录按钮点击
 */
const handleLogin = () => {
    showLogin.value = true;
};
/**
 * 处理注册按钮点击
 */
const handleRegister = () => {
    showRegister.value = true;
};
/**
 * 关闭登录弹窗
 */
const closeLogin = () => {
    showLogin.value = false;
    userStore.closeLoginDialog();
};
/**
 * 关闭注册弹窗
 */
const closeRegister = () => {
    showRegister.value = false;
};
/**
 * 切换到注册页面
 */
const switchToRegister = () => {
    showLogin.value = false;
    showRegister.value = true;
};
/**
 * 切换到登录页面
 */
const switchToLogin = () => {
    showRegister.value = false;
    showLogin.value = true;
};
/**
 * 处理退出登录
 */
const handleLogout = async () => {
    try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        userStore.logout();
        ElMessage.success('退出登录成功');
        router.push('/');
    }
    catch {
        // 用户取消操作
    }
};
/**
 * 跳转到个人信息页面
 */
const goToPersonal = () => {
    router.push('/personal');
};
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    userStore.initializeUser();
});
onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "common-layout" },
});
/** @type {__VLS_StyleScopedClasses['common-layout']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.elHeader | typeof __VLS_components.ElHeader | typeof __VLS_components.elHeader | typeof __VLS_components.ElHeader} */
elHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "header" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['header']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-content" },
});
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "logo" },
});
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
if (__VLS_ctx.isMobile) {
    let __VLS_12;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        ...{ 'onClick': {} },
        ...{ class: "mobile-menu-btn" },
        circle: true,
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onClick': {} },
        ...{ class: "mobile-menu-btn" },
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_17;
    const __VLS_18 = ({ click: {} },
        { onClick: (__VLS_ctx.toggleSidebar) });
    /** @type {__VLS_StyleScopedClasses['mobile-menu-btn']} */ ;
    const { default: __VLS_19 } = __VLS_15.slots;
    let __VLS_20;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        size: (20),
    }));
    const __VLS_22 = __VLS_21({
        size: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_25 } = __VLS_23.slots;
    const __VLS_26 = (__VLS_ctx.sidebarVisible ? 'Close' : 'Menu');
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({}));
    const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
    // @ts-ignore
    [isMobile, toggleSidebar, sidebarVisible,];
    var __VLS_23;
    // @ts-ignore
    [];
    var __VLS_15;
    var __VLS_16;
}
let __VLS_31;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    size: (32),
}));
const __VLS_33 = __VLS_32({
    size: (32),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_36 } = __VLS_34.slots;
let __VLS_37;
/** @ts-ignore @type {typeof __VLS_components.Document} */
Document;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({}));
const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
// @ts-ignore
[];
var __VLS_34;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-actions" },
});
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
if (__VLS_ctx.userStore.isLoggedIn && __VLS_ctx.userStore.userInfo) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.goToPersonal) },
        ...{ class: "user-info" },
    });
    /** @type {__VLS_StyleScopedClasses['user-info']} */ ;
    let __VLS_42;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({}));
    const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
    const { default: __VLS_47 } = __VLS_45.slots;
    let __VLS_48;
    /** @ts-ignore @type {typeof __VLS_components.UserFilled} */
    UserFilled;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({}));
    const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
    // @ts-ignore
    [userStore, userStore, goToPersonal,];
    var __VLS_45;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "username" },
    });
    /** @type {__VLS_StyleScopedClasses['username']} */ ;
    (__VLS_ctx.userStore.userInfo.name);
    let __VLS_53;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
        ...{ 'onClick': {} },
        ...{ class: "logout-btn" },
    }));
    const __VLS_55 = __VLS_54({
        ...{ 'onClick': {} },
        ...{ class: "logout-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    let __VLS_58;
    const __VLS_59 = ({ click: {} },
        { onClick: (__VLS_ctx.handleLogout) });
    /** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
    const { default: __VLS_60 } = __VLS_56.slots;
    let __VLS_61;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({}));
    const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
    const { default: __VLS_66 } = __VLS_64.slots;
    let __VLS_67;
    /** @ts-ignore @type {typeof __VLS_components.SwitchButton} */
    SwitchButton;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({}));
    const __VLS_69 = __VLS_68({}, ...__VLS_functionalComponentArgsRest(__VLS_68));
    // @ts-ignore
    [userStore, handleLogout,];
    var __VLS_64;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
    var __VLS_56;
    var __VLS_57;
}
else {
    let __VLS_72;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        ...{ 'onClick': {} },
        ...{ class: "login-btn" },
    }));
    const __VLS_74 = __VLS_73({
        ...{ 'onClick': {} },
        ...{ class: "login-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    let __VLS_77;
    const __VLS_78 = ({ click: {} },
        { onClick: (__VLS_ctx.handleLogin) });
    /** @type {__VLS_StyleScopedClasses['login-btn']} */ ;
    const { default: __VLS_79 } = __VLS_75.slots;
    let __VLS_80;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    const { default: __VLS_85 } = __VLS_83.slots;
    let __VLS_86;
    /** @ts-ignore @type {typeof __VLS_components.User} */
    User;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({}));
    const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
    // @ts-ignore
    [handleLogin,];
    var __VLS_83;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
    var __VLS_75;
    var __VLS_76;
    let __VLS_91;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
        ...{ 'onClick': {} },
        ...{ class: "register-btn" },
        type: "primary",
    }));
    const __VLS_93 = __VLS_92({
        ...{ 'onClick': {} },
        ...{ class: "register-btn" },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    let __VLS_96;
    const __VLS_97 = ({ click: {} },
        { onClick: (__VLS_ctx.handleRegister) });
    /** @type {__VLS_StyleScopedClasses['register-btn']} */ ;
    const { default: __VLS_98 } = __VLS_94.slots;
    let __VLS_99;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({}));
    const __VLS_101 = __VLS_100({}, ...__VLS_functionalComponentArgsRest(__VLS_100));
    const { default: __VLS_104 } = __VLS_102.slots;
    let __VLS_105;
    /** @ts-ignore @type {typeof __VLS_components.UserFilled} */
    UserFilled;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({}));
    const __VLS_107 = __VLS_106({}, ...__VLS_functionalComponentArgsRest(__VLS_106));
    // @ts-ignore
    [handleRegister,];
    var __VLS_102;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
    var __VLS_94;
    var __VLS_95;
}
// @ts-ignore
[];
var __VLS_9;
let __VLS_110;
/** @ts-ignore @type {typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({}));
const __VLS_112 = __VLS_111({}, ...__VLS_functionalComponentArgsRest(__VLS_111));
const { default: __VLS_115 } = __VLS_113.slots;
if (__VLS_ctx.isMobile && __VLS_ctx.sidebarVisible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.toggleSidebar) },
        ...{ class: "sidebar-overlay" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-overlay']} */ ;
}
let __VLS_116;
/** @ts-ignore @type {typeof __VLS_components.elAside | typeof __VLS_components.ElAside | typeof __VLS_components.elAside | typeof __VLS_components.ElAside} */
elAside;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
    width: (__VLS_ctx.sidebarWidth),
    ...{ class: "aside" },
    ...{ class: ({ 'mobile-hidden': __VLS_ctx.isMobile && !__VLS_ctx.sidebarVisible }) },
}));
const __VLS_118 = __VLS_117({
    width: (__VLS_ctx.sidebarWidth),
    ...{ class: "aside" },
    ...{ class: ({ 'mobile-hidden': __VLS_ctx.isMobile && !__VLS_ctx.sidebarVisible }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
/** @type {__VLS_StyleScopedClasses['aside']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-hidden']} */ ;
const { default: __VLS_121 } = __VLS_119.slots;
let __VLS_122;
/** @ts-ignore @type {typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu} */
elMenu;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
    ...{ 'onSelect': {} },
    defaultActive: (__VLS_ctx.activeMenu),
    ...{ class: "aside-menu" },
}));
const __VLS_124 = __VLS_123({
    ...{ 'onSelect': {} },
    defaultActive: (__VLS_ctx.activeMenu),
    ...{ class: "aside-menu" },
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
let __VLS_127;
const __VLS_128 = ({ select: {} },
    { onSelect: (__VLS_ctx.handleMenuSelect) });
/** @type {__VLS_StyleScopedClasses['aside-menu']} */ ;
const { default: __VLS_129 } = __VLS_125.slots;
let __VLS_130;
/** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
    index: "home",
}));
const __VLS_132 = __VLS_131({
    index: "home",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
let __VLS_136;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({}));
const __VLS_138 = __VLS_137({}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_141 } = __VLS_139.slots;
let __VLS_142;
/** @ts-ignore @type {typeof __VLS_components.HomeFilled} */
HomeFilled;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({}));
const __VLS_144 = __VLS_143({}, ...__VLS_functionalComponentArgsRest(__VLS_143));
// @ts-ignore
[isMobile, isMobile, toggleSidebar, sidebarVisible, sidebarVisible, sidebarWidth, activeMenu, handleMenuSelect,];
var __VLS_139;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_133;
let __VLS_147;
/** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
    index: "resume-analyze",
}));
const __VLS_149 = __VLS_148({
    index: "resume-analyze",
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
const { default: __VLS_152 } = __VLS_150.slots;
let __VLS_153;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({}));
const __VLS_155 = __VLS_154({}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const { default: __VLS_158 } = __VLS_156.slots;
let __VLS_159;
/** @ts-ignore @type {typeof __VLS_components.Document} */
Document;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({}));
const __VLS_161 = __VLS_160({}, ...__VLS_functionalComponentArgsRest(__VLS_160));
// @ts-ignore
[];
var __VLS_156;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_150;
let __VLS_164;
/** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({
    index: "job-recommend",
}));
const __VLS_166 = __VLS_165({
    index: "job-recommend",
}, ...__VLS_functionalComponentArgsRest(__VLS_165));
const { default: __VLS_169 } = __VLS_167.slots;
let __VLS_170;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent1(__VLS_170, new __VLS_170({}));
const __VLS_172 = __VLS_171({}, ...__VLS_functionalComponentArgsRest(__VLS_171));
const { default: __VLS_175 } = __VLS_173.slots;
let __VLS_176;
/** @ts-ignore @type {typeof __VLS_components.Briefcase} */
Briefcase;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent1(__VLS_176, new __VLS_176({}));
const __VLS_178 = __VLS_177({}, ...__VLS_functionalComponentArgsRest(__VLS_177));
// @ts-ignore
[];
var __VLS_173;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_167;
let __VLS_181;
/** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent1(__VLS_181, new __VLS_181({
    index: "ai-chat",
}));
const __VLS_183 = __VLS_182({
    index: "ai-chat",
}, ...__VLS_functionalComponentArgsRest(__VLS_182));
const { default: __VLS_186 } = __VLS_184.slots;
let __VLS_187;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_188 = __VLS_asFunctionalComponent1(__VLS_187, new __VLS_187({}));
const __VLS_189 = __VLS_188({}, ...__VLS_functionalComponentArgsRest(__VLS_188));
const { default: __VLS_192 } = __VLS_190.slots;
let __VLS_193;
/** @ts-ignore @type {typeof __VLS_components.ChatDotRound} */
ChatDotRound;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({}));
const __VLS_195 = __VLS_194({}, ...__VLS_functionalComponentArgsRest(__VLS_194));
// @ts-ignore
[];
var __VLS_190;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_184;
let __VLS_198;
/** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
    index: "settings",
}));
const __VLS_200 = __VLS_199({
    index: "settings",
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
const { default: __VLS_203 } = __VLS_201.slots;
let __VLS_204;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({}));
const __VLS_206 = __VLS_205({}, ...__VLS_functionalComponentArgsRest(__VLS_205));
const { default: __VLS_209 } = __VLS_207.slots;
let __VLS_210;
/** @ts-ignore @type {typeof __VLS_components.Setting} */
Setting;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({}));
const __VLS_212 = __VLS_211({}, ...__VLS_functionalComponentArgsRest(__VLS_211));
// @ts-ignore
[];
var __VLS_207;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_201;
if (__VLS_ctx.userStore.userInfo?.is_admin) {
    let __VLS_215;
    /** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
    elMenuItem;
    // @ts-ignore
    const __VLS_216 = __VLS_asFunctionalComponent1(__VLS_215, new __VLS_215({
        index: "manage",
    }));
    const __VLS_217 = __VLS_216({
        index: "manage",
    }, ...__VLS_functionalComponentArgsRest(__VLS_216));
    const { default: __VLS_220 } = __VLS_218.slots;
    let __VLS_221;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_222 = __VLS_asFunctionalComponent1(__VLS_221, new __VLS_221({}));
    const __VLS_223 = __VLS_222({}, ...__VLS_functionalComponentArgsRest(__VLS_222));
    const { default: __VLS_226 } = __VLS_224.slots;
    let __VLS_227;
    /** @ts-ignore @type {typeof __VLS_components.Operation} */
    Operation;
    // @ts-ignore
    const __VLS_228 = __VLS_asFunctionalComponent1(__VLS_227, new __VLS_227({}));
    const __VLS_229 = __VLS_228({}, ...__VLS_functionalComponentArgsRest(__VLS_228));
    // @ts-ignore
    [userStore,];
    var __VLS_224;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
    var __VLS_218;
}
// @ts-ignore
[];
var __VLS_125;
var __VLS_126;
// @ts-ignore
[];
var __VLS_119;
let __VLS_232;
/** @ts-ignore @type {typeof __VLS_components.elMain | typeof __VLS_components.ElMain | typeof __VLS_components.elMain | typeof __VLS_components.ElMain} */
elMain;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent1(__VLS_232, new __VLS_232({
    ...{ class: "main" },
}));
const __VLS_234 = __VLS_233({
    ...{ class: "main" },
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
/** @type {__VLS_StyleScopedClasses['main']} */ ;
const { default: __VLS_237 } = __VLS_235.slots;
let __VLS_238;
/** @ts-ignore @type {typeof __VLS_components.routerView | typeof __VLS_components.RouterView} */
routerView;
// @ts-ignore
const __VLS_239 = __VLS_asFunctionalComponent1(__VLS_238, new __VLS_238({}));
const __VLS_240 = __VLS_239({}, ...__VLS_functionalComponentArgsRest(__VLS_239));
// @ts-ignore
[];
var __VLS_235;
// @ts-ignore
[];
var __VLS_113;
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.showLogin) {
    const __VLS_243 = Login;
    // @ts-ignore
    const __VLS_244 = __VLS_asFunctionalComponent1(__VLS_243, new __VLS_243({
        ...{ 'onClose': {} },
        ...{ 'onSwitchToRegister': {} },
    }));
    const __VLS_245 = __VLS_244({
        ...{ 'onClose': {} },
        ...{ 'onSwitchToRegister': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_244));
    let __VLS_248;
    const __VLS_249 = ({ close: {} },
        { onClose: (__VLS_ctx.closeLogin) });
    const __VLS_250 = ({ switchToRegister: {} },
        { onSwitchToRegister: (__VLS_ctx.switchToRegister) });
    var __VLS_246;
    var __VLS_247;
}
if (__VLS_ctx.showRegister) {
    const __VLS_251 = Register;
    // @ts-ignore
    const __VLS_252 = __VLS_asFunctionalComponent1(__VLS_251, new __VLS_251({
        ...{ 'onClose': {} },
        ...{ 'onSwitchToLogin': {} },
    }));
    const __VLS_253 = __VLS_252({
        ...{ 'onClose': {} },
        ...{ 'onSwitchToLogin': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_252));
    let __VLS_256;
    const __VLS_257 = ({ close: {} },
        { onClose: (__VLS_ctx.closeRegister) });
    const __VLS_258 = ({ switchToLogin: {} },
        { onSwitchToLogin: (__VLS_ctx.switchToLogin) });
    var __VLS_254;
    var __VLS_255;
}
// @ts-ignore
[showLogin, closeLogin, switchToRegister, showRegister, closeRegister, switchToLogin,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
