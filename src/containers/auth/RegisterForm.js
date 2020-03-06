import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {changeField,initializeForm,register} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {withRouter} from 'react-router-dom';

function RegisterForm({history}) {
    const [error,setError]=useState(null);
    const dispatch=useDispatch();
    const {form,auth,authError,user}=useSelector(({auth,user})=>({
        form:auth.register,
        auth:auth.auth,
        authError:auth.authError,
        user:user.user
    }));

    const onChange=e=>{
        const {value,name}=e.target;
        dispatch(
            changeField({
                form:'register',
                key:name,
                value
            })
        );
    };
    const onSubmit=e=>{
        e.preventDefault();
        const {username,password,passwordConfirm}=form;
        if([username,password,passwordConfirm].includes('')){
            setError('입력 폼을 완성하세요');
            return;
        }
        if(password!==passwordConfirm){
            setError('비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        dispatch(register({username,password}));
    }

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            if(authError.response.status===409){
                setError('이미 존재하는 계정명 입니다.');
            }
            setError('회원가입 실패');
            return;
        }
        if(auth){
            console.log('회원가입 성공!');
            console.log(auth);
            dispatch(check());
            
        }
    },[auth,authError,dispatch]);
    useEffect(()=>{
        if(user){
            history.push('/');
            try{
                localStorage.setItem('user',JSON.stringify(user));
            }catch(e){
                console.log('localStorage is not Working');
            }
        }
    },[history,user])

    return (
       <AuthForm
       type='register'
       form={form}
       onChange={onChange}
       onSubmit={onSubmit}
       error={error}
       />
    )
}

export default withRouter(RegisterForm);