import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"
import InputGroup from "../ui/InputGroup"
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { useState } from "react";
import GoogleBtn from "./GoogleBtn";
const schema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(8,"password must be at least 8 characters").max(256)
})
type schemaType = z.infer<typeof schema>;
function LoginForm() {
  const [isLoading ,setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const  {
    register,
    formState :{
      errors,
     isValid

    },
    handleSubmit,
  } = useForm<schemaType>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  });
  function onSubmit(data: schemaType) {
    setIsLoading(true);
    try {
      console.log(data);
      // make axios request here
      setTimeout(() => {
        navigate("/dashboard/1234");
      }, 2000);
    }
    catch(err){
      toast.error((err as Error).message);
    }
    finally {
      setIsLoading(false);
    }
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:w-full w-[90%] max-w-[24rem] flex flex-col mx-auto lg:mx-0 justify-center font-inter space-y-4">
        <h1 className="text-2xl font-semibold leading-6 !mb-7 text-center lg:text-left">Sign in to LectureDeck</h1>
        <GoogleBtn disabled={isLoading}/>
        <div className="flex items-center gap-2 mt-2 max-w-[24rem]">
          <hr className="w-[50%]"/>
          <p className="leading-6 min-w-fit flex-shrink-0 text-sm text-center text-[#667085]">or sign in with email</p>
          <hr className="w-[50%]"/> 
        </div>
        <InputGroup
          id="email"
          label="email"
          inputType="email"
          register={register as unknown as UseFormRegister<FieldValues>}
          disabled={isLoading}
          error={errors["email"]}
        />
        <InputGroup
          id="password"
          label="password"
          inputType="password"
          register={register as unknown as  UseFormRegister<FieldValues>}
          disabled={isLoading}
          error={errors["password"]}
        />
        <div className="text-right !my-3">
          <Link to="/password-reset" className="text-sm leading-6 text-[#667085] underline">forgot password?</Link>
        </div>
        <Button disabled={ !isValid || isLoading} className="w-full" size='lg'>Sign in</Button>
        <div>
          <p className="text-sm leading-6 text-[#667085]">Don't Have account <Link to="/signup" className="underline">Sign up?</Link> </p>
        </div>
    </form>
  )
}

export default LoginForm