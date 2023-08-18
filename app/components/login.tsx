"use client";

import { Database } from "@/lib/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../loading";

type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力してください" }),
});

const Login = () => {
  const router = useRouter();
  const supabase = createServerComponentClient<Database>()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setMessage("エラーが発生" + error.message);
        return;
      }
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div>ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="メアド"
          id="email"
          {...(register("email"), { required: true })}
        />
        <div>{errors.email?.message}</div>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          placeholder="パスワード"
          id="password"
          {...(register("password"), { required: true })}
        />
        <div>{errors.password?.message}</div>
        <div>
          {loading ? <Loading /> : <button type="submit">ログイン</button>}
        </div>
      </form>

      {message && <div>{message}</div>}

      <div>
        <Link href="/auth/reset-password">パスワードを忘れた方</Link>
      </div>
      <div>
        <Link href="/auth/signup">アカウント作成</Link>
      </div>
    </div>
  );
};

export default Login;
