"use client"

import { useEffect } from "react"
import { useShop } from "../hooks/useShop"
import { useInventory } from "@/features/alchemy/hooks/useInventory"
import { useCory } from "@/features/alchemy/hooks/useCory"
import { ItemIcon } from "@/features/alchemy/ui/ItemIcon"
import { StickerCard } from "@/components/ui/sticker-card"

export function ShopPopup() {
    const shopItems = useShop((s) => s.items)
    const generateShop = useShop((s) => s.generate)

    const getBuyPrice = useShop((s) => s.getBuyPrice)
    const getSellPrice = useShop((s) => s.getSellPrice)

    const addItem = useInventory((s) => s.addItem)
    const removeItem = useInventory((s) => s.removeItem)
    const userItems = useInventory((s) => s.items)

    const cory = useCory((s) => s.cory)
    const addCory = useCory((s) => s.addCory)
    const spendCory = useCory((s) => s.spendCory)

    useEffect(() => {
        generateShop()
    }, [])

    async function buy(item: any) {
        const price = getBuyPrice(item)
        if (cory < price) return

        await spendCory(price)
        await addItem({ ...item, rarity: undefined }, 1)
    }

    async function sell(item: any) {
        const price = getSellPrice(item)
        await removeItem(item.id, 1)
        await addCory(price)
    }

    return (
        <div className="flex flex-col gap-6 p-4 max-w-full">
            <p className="text-[32px] font-bold text-center">Лавка Питрица</p>

            <StickerCard>
                <p className="text-xl font-bold mb-3">Товары Питрица</p>
                <div className="flex gap-3 flex-wrap">
                    {shopItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => buy(item)}
                            className="cursor-pointer hover:scale-110 transition"
                        >
                            <div className="slot-9">
                                <ItemIcon item={item}/>
                            </div>

                            <div className="flex gap-2 items-center mt-1">
                                <img src="/images/kory.png" className="w-8 h-full" />
                                <p className="text-[20px] lg:text-[32px]">{getBuyPrice(item)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </StickerCard>

            <StickerCard>
			<div className="w-full flex items-center justify-between">
				<p className="text-[32px]">Инвентарь</p>
					<div className="flex gap-2 items-center">
						<img src="/images/kory.png" className="w-8 h-full" />
						<p className="text-[32px]">{cory}</p>
					</div>
			</div>
                <div className="flex gap-3 flex-wrap">
                    {userItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => sell(item)}
                            className="cursor-pointer hover:scale-110 transition"
                        >
                            <div className="slot-9">
                                <ItemIcon item={item} size={60} />
                            </div>

                            <div className="flex gap-2 items-center mt-1">
                                <img src="/images/kory.png" className="w-8 h-full" />
                                <p className="text-[20px] lg:text-[32px]">{getSellPrice(item)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </StickerCard>
        </div>
    )
}
