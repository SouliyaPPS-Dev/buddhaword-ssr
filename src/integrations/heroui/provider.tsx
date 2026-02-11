"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

interface HeroRouterOptions {
  replace?: boolean;
  params?: Record<string, unknown>;
  search?: Record<string, unknown>;
}

export function HeroUIRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const navigate = useCallback(
    (href: string, options?: HeroRouterOptions) =>
      router.navigate({
        to: href as never,
        replace: options?.replace,
        params: options?.params as never,
        search: options?.search as never,
      }),
    [router],
  );

  const useHref = useCallback(
    (href: string, options?: HeroRouterOptions) => {
      try {
        return router.buildLocation({
          to: href as never,
          params: options?.params as never,
          search: options?.search as never,
        }).href;
      } catch {
        return href;
      }
    },
    [router],
  );

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      {children}
    </HeroUIProvider>
  );
}
