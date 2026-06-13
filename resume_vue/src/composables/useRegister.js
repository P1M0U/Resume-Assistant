// 注册组合式函数
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { register as registerApi } from '@/services/auth_api';
import { validateEmail } from '@/utils/validation';
/**
 * 注册组合式函数
 * @param emit - emit函数
 * @returns 响应式数据和方法
 */
export function useRegister(emit) {
    const registerForm = ref({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const loading = ref(false);
    /**
     * 处理注册
     */
    const handleRegister = async () => {
        if (!registerForm.value.username.trim()) {
            ElMessage.warning('请输入用户名');
            return;
        }
        if (!registerForm.value.email.trim()) {
            ElMessage.warning('请输入邮箱');
            return;
        }
        if (!validateEmail(registerForm.value.email)) {
            ElMessage.warning('请输入有效的邮箱地址');
            return;
        }
        if (!registerForm.value.password.trim()) {
            ElMessage.warning('请输入密码');
            return;
        }
        if (registerForm.value.password.length < 4) {
            ElMessage.warning('密码长度至少为4位');
            return;
        }
        if (registerForm.value.password !== registerForm.value.confirmPassword) {
            ElMessage.warning('两次输入的密码不一致');
            return;
        }
        if (!registerForm.value.agreeTerms) {
            ElMessage.warning('请阅读并同意用户协议');
            return;
        }
        loading.value = true;
        try {
            await registerApi({
                name: registerForm.value.username,
                email: registerForm.value.email,
                password: registerForm.value.password,
            });
            ElMessage.success('注册成功，请登录');
            emit('switch-to-login');
        }
        catch (error) {
            console.error('注册失败:', error);
        }
        finally {
            loading.value = false;
        }
    };
    /**
     * 处理登录
     */
    const handleLogin = () => {
        ElMessage.info('请切换到登录页面');
    };
    return {
        registerForm,
        loading,
        handleRegister,
        handleLogin,
    };
}
