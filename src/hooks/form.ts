import { ZodSchema } from "zod";
import { Path, useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export function useForm<T extends {}>({ schema }: { schema: ZodSchema<T> }) {
  const {
    formState: { errors },
    register,
    ...rest
  } = useReactHookForm<T>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    Object.keys(schema).forEach((k) => {
      register(k as Path<T>);
    });
  }, [register]);

  return {
    errors,
    register,
    ...rest,
  };
}
