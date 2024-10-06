'use client'
import React from 'react'
import { Link } from '@/components/navigation'
import DashCodeLogo from "@/components/dascode-logo"
import { useConfig } from '@/hooks/use-config'
import { useMediaQuery } from '@/hooks/use-media-query'

const HeaderLogo = () => {
    const [config] = useConfig();

    const isDesktop = useMediaQuery('(min-width: 1280px)');

    return (
        config.layout === 'horizontal' ? (
            <Link href="/dashboard/analytics" className="flex gap-2 items-center    ">
                <DashCodeLogo className="  text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background" />
                <h1 className="text-xl font-semibold text-default-900 lg:block hidden ">
                    DashCode
                </h1>
            </Link>
        ) :
            !isDesktop && (
                <Link href="/dashboard/analytics" className="flex gap-2 items-center    ">
                    <DashCodeLogo className="  text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background" />
                    <h1 className="text-xl font-semibold text-default-900 lg:block hidden ">
                        DashCode
                    </h1>
                </Link>
            )
    )
}

export default HeaderLogo