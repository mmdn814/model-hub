import { Badge } from "@/components/ui/badge";
import { DevAnnotation } from "@/components/DevAnnotation";

interface DiscountBadgeProps {
  discount?: string; // e.g., "50% OFF"
  className?: string;
}

export function DiscountBadge({ discount = "20% OFF", className }: DiscountBadgeProps) {
  return (
    <DevAnnotation
      elementName="模型折扣标签"
      componentType="Badge"
      functionDesc="展示模型限时折扣状态"
      customContent={
        <div className="space-y-3 text-sm">
          <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">【202629需求-模型折扣】</div>
          <ul className="space-y-2">
            <li><span className="font-semibold">展示区域:</span> pricing页面 \ 模型广场 \ 模型详情页头部 \ 模型详情页readme价格区域，都增加对应的模型折扣。</li>
            <li><span className="font-semibold">数据来源:</span> 模型是否有折扣，以及具体折扣、时间范围均来自B端的营销模块的模型限时折扣活动对应的设置。</li>
          </ul>
        </div>
      }
    >
      <Badge variant="destructive" className={`bg-red-500 hover:bg-red-600 text-white font-bold px-1.5 py-0.5 text-[10px] rounded-md ${className}`}>
        {discount}
      </Badge>
    </DevAnnotation>
  );
}
