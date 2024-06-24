"use client";
import { User } from "next-auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFormik } from "formik";
import { Loader2, User2 } from "lucide-react";
import { Button } from "./ui/button";
import { object, string } from "yup";
import { useEffect, useState } from "react";
import { isUserNameAvailable, updateUserProfile } from "@/actions";
import { useRouter } from "next/navigation";
type NewUserData = { username: string | null } & Required<User>;

type FormikData = {
  name: string;
  username: string;
  bio: string;
  error: string;
};

export function UserForm({ data }: { data: NewUserData }) {
  const [imgUrl, setImgUrl] = useState<string | null>(data.image);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik<FormikData>({
    initialValues: {
      name: data.name ?? "",
      bio: "",
      username: data.username ?? "",
      error: "",
    },
    onSubmit: (values) => {},
    validationSchema: object({
      name: string().required(),
      username: string()
        .required()
        .min(4)
        .max(15, "username must be 15 characters or less")
        .matches(
          /^[^ .]*$/,
          "Username should not contain space or dot characters"
        ),
      image: string(),
      bio: string(),
      error: string(),
    }),
    validateOnChange: true,
    isInitialValid: false,
  });

  const setError = () =>
    formik.setFieldError("username", "username is not available.");

  const { result } = useDebounce(formik.values.username, setError);

  return (
    <div className=" md:pl-6  md:w-full pb-4">
      <h2 className=" text-2xl font-medium">Lets complete your profile.</h2>
      <div className=" flex w-full items-start pt-6 md:gap-10 gap-6">
        <div className=" flex basis-2/3 sm:basis-2/5 flex-col items-start gap-4">
          <div className=" w-full">
            <Label htmlFor="name" className=" font-medium opacity-80">
              Name <span className=" text-red-500">*</span>
            </Label>
            <Input
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Name"
              name="name"
              className=" rounded-sm"
            />
          </div>
          <div className=" w-full">
            <Label htmlFor="username" className=" font-medium opacity-80">
              Username <span className=" text-red-500">*</span>
            </Label>
            <Input
              placeholder="Username"
              name="username"
              value={formik.values.username}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              className=" w-full rounded-sm"
            />
            {formik.errors.username && (
              <Label className=" text-xs text-red-400">
                {formik.errors.username}
              </Label>
            )}
            {!formik.errors.username && result && (
              <Label className=" text-xs text-green-400 ">
                Username is available
              </Label>
            )}
          </div>
          <div className=" w-full flex flex-col gap-1 items-start">
            <Label className=" font-medium opacity-80">Bio</Label>
            <textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              className=" resize-none w-full h-28 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none focus-visible:ring-ring focus:outline-none rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              spellCheck={false}
              placeholder="Share your journey, one keystroke at a time."
            />
          </div>
        </div>
        <div>
          <Avatar className="md:w-28 md:h-28 w-16 h-16 flex items-center justify-center border cursor-pointer">
            {imgUrl ? (
              <AvatarImage src={imgUrl} />
            ) : (
              <User2 className=" w-full h-full opacity-50 hover:opacity-60 transition-all" />
            )}
          </Avatar>
        </div>
      </div>
      <Button
        className=" rounded-sm w-full md:w-2/5 font-medium mt-4 flex items-center gap-2"
        onClick={async () => {
          formik.validateForm();
          if (formik.isValid) {
            setLoading(true);

            const result = await updateUserProfile({
              name: formik.values.name,
              bio: formik.values.bio,
              username: formik.values.username,
              image: imgUrl,
            });
            setLoading(false);

            if (!result) {
              formik.setErrors({
                error: "Something went wrong please try again later",
              });
              return;
            }

            router.replace("/");
          }
        }}
      >
        Continue
        {loading && (
          <span>
            <Loader2 className=" w-4 h-4 animate-spin" />
          </span>
        )}
      </Button>
      {formik.errors.error && (
        <Label className=" text-red-400 text-xs">{formik.errors.error}</Label>
      )}
    </div>
  );
}

const useDebounce = (username: string, action: () => void) => {
  const [result, setResult] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (username.length >= 6) {
      timeoutId = setTimeout(async () => {
        const isUsername = await isUserNameAvailable(username);
        setResult(isUsername);
        if (!isUsername) action();
      }, 200);
    }

    return () => clearTimeout(timeoutId);
  }, [username]);
  return { result };
};
