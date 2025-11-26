"use client"

import { Cauldron } from "./Cauldron"
import { useInventory } from "@/features/alchemy/hooks/useInventory"
import { useCauldron } from "@/features/alchemy/hooks/useCauldron"
import { ItemIcon } from "@/features/alchemy/ui/ItemIcon"
import { StickerCard } from "@/components/ui/sticker-card"

export function CauldronPopup() {
    const items = useInventory((s) => s.items)
    const removeItem = useInventory((s) => s.removeItem)
    const addToCauldron = useCauldron((s) => s.addToCauldron)

    function isIngredient(item: any) {
        return (
            item.type === "plant" ||
            item.type === "mineral" ||
            item.type === "anomaly"
        )
    }

    async function handleAdd(item: any) {
        if (!isIngredient(item)) return

        const ok = await addToCauldron(item.id)
        if (!ok) return

        await removeItem(item.id, 1)
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <Cauldron />

            <StickerCard>
                <p className="text-[32px] text-center mb-4">Инвентарь</p>

                <div className="grid grid-cols-3 gap-3">
                    {items.map((item) => {
                        const ingredient = isIngredient(item)

                        return (
                            <div
                                key={item.id}
                                onClick={() => ingredient && handleAdd(item)}
                                className={`
                                    transition
                                    ${ingredient
                                        ? "cursor-pointer hover:scale-110"
                                        : "opacity-40"
                                    }
                                `}
                            >
                                <div className="slot-9">
                                    <ItemIcon item={item} size={60} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </StickerCard>
        </div>
    )
}
