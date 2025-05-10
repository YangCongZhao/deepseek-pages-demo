import { Input } from 'react-vant';
import { useState } from 'react';
import * as React from 'react';
import clsx from 'clsx';

interface MyTab {
    tabVal: 'login' | 'register';
}

const Login: React.FC = () => {
    const [tabVal, setTabVal] = useState<'login' | 'register'>('login');

    const TabChange: React.FC<MyTab> = ({ tabVal }) => {
        const login = (
            <>
                <div className="mt-6">
                    <Input prefix="手机号" placeholder="请输入用户名" />
                </div>
                <div className="mt-6">
                    <Input prefix="密码" placeholder="请输入密码" />
                </div>
            </>
        );
        const register = <></>;

        const returnOBJ = {
            login,
            register,
        };

        return returnOBJ[tabVal];
    };

    return (
        <div className="w-screen h-screen bg-white p-6">
            <div className="flex justify-around pt-6">
                <div
                    onClick={() => setTabVal('login')}
                    className={clsx(
                        'px-4 py-2 cursor-pointer',
                        tabVal === 'login' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
                    )}
                >
                    登录
                </div>
                <div
                    onClick={() => setTabVal('register')}
                    className={clsx(
                        'px-4 py-2 cursor-pointer',
                        tabVal === 'register' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
                    )}
                >
                    注册
                </div>
            </div>

            <TabChange tabVal={tabVal} />

            <div className="w-[300px] h-[30px] mt-6 rounded-lg bg-green-400 text-center leading-[30px] text-white">
                登录
            </div>
        </div>
    );
};

export default Login;
