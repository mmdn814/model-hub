import React, { useState, cloneElement, isValidElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface DevAnnotationProps {
  children: React.ReactNode;
  elementName?: string;
  componentType?: string;
  functionDesc?: string;
  interactionRule?: string;
  defaultValue?: string;
  dataSource?: string;
  autoLogic?: string;
  validationRule?: string;
  errorHandler?: string;
  devNotes?: string;
  customContent?: React.ReactNode;
}

export function DevAnnotation({
  children,
  elementName = "无",
  componentType = "无",
  functionDesc = "无",
  interactionRule = "无",
  defaultValue = "无",
  dataSource = "无",
  autoLogic = "无",
  validationRule = "无",
  errorHandler = "无",
  devNotes = "无",
  customContent,
}: DevAnnotationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleTooltip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isOpen) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      let x = rect.right + 10;
      let y = rect.top;
      
      if (x + 320 > window.innerWidth) {
        x = rect.left - 330;
      }
      if (x < 10) x = 10;
      
      if (y + 400 > window.innerHeight) {
        y = window.innerHeight - 410;
      }
      if (y < 10) y = 10;
      
      setPosition({ x, y });
    }
    setIsOpen(!isOpen);
  };

  const tooltip = isOpen ? createPortal(
    <div 
      ref={tooltipRef}
      className={cn(
        "fixed z-[99999] bg-[#fff9c4] border border-[#fbc02d] shadow-xl p-4 rounded-lg text-xs text-zinc-800 font-sans leading-relaxed",
        customContent ? "w-96" : "w-80"
      )}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    >
      {customContent ? (
        customContent
      ) : (
        <div className="space-y-2">
          <div><span className="font-bold text-[#f57f17]">【元素名称】</span><br/>{elementName}</div>
          <div><span className="font-bold text-[#f57f17]">【组件类型】</span><br/>{componentType}</div>
          <div><span className="font-bold text-[#f57f17]">【功能说明】</span><br/>{functionDesc}</div>
          <div><span className="font-bold text-[#f57f17]">【交互规则】</span><br/>{interactionRule}</div>
          <div><span className="font-bold text-[#f57f17]">【默认值】</span><br/>{defaultValue}</div>
          <div><span className="font-bold text-[#f57f17]">【数据来源】</span><br/>{dataSource}</div>
          <div><span className="font-bold text-[#f57f17]">【自动逻辑】</span><br/>{autoLogic}</div>
          <div><span className="font-bold text-[#f57f17]">【校验规则】</span><br/>{validationRule}</div>
          <div><span className="font-bold text-[#f57f17]">【异常处理】</span><br/>{errorHandler}</div>
          <div><span className="font-bold text-[#f57f17]">【开发备注】</span><br/>{devNotes}</div>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  if (isValidElement(children)) {
    const childProps = children.props as any;
    const isDOMElement = typeof children.type === 'string';
    const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    const isVoidElement = isDOMElement && voidElements.has(children.type as string);
    
    if (isDOMElement && !isVoidElement) {
      const hasPosition = childProps.className?.match(/\b(relative|absolute|fixed|sticky)\b/);
      const isFixed = childProps.className?.match(/\bfixed\b/);
      
      const buttonClass = isFixed 
        ? "absolute top-4 right-4 z-[99998]" 
        : "absolute -top-2 -right-2 z-[99998]";

      const questionButton = (
        <button
          ref={buttonRef}
          onClick={toggleTooltip}
          className={cn(
            buttonClass,
            "w-5 h-5 bg-[#f57f17] text-white rounded-full shadow-md flex items-center justify-center hover:bg-[#f9a825] transition-colors cursor-help border border-white"
          )}
          title="查看开发注释"
        >
          <span className="text-xs font-bold leading-none">?</span>
        </button>
      );

      return (
        <>
          {cloneElement(children as React.ReactElement<any>, {
            className: cn(childProps.className, !hasPosition && "relative"),
            children: (
              <>
                {childProps.children}
                {questionButton}
              </>
            )
          })}
          {tooltip}
        </>
      );
    }
  }

  // Fallback for non-DOM elements, void elements, or text nodes
  return (
    <div className="relative inline-block w-fit">
      {children}
      <button
        ref={buttonRef}
        onClick={toggleTooltip}
        className="absolute -top-2 -right-2 z-[99998] w-5 h-5 bg-[#f57f17] text-white rounded-full shadow-md flex items-center justify-center hover:bg-[#f9a825] transition-colors cursor-help border border-white"
        title="查看开发注释"
      >
        <span className="text-xs font-bold leading-none">?</span>
      </button>
      {tooltip}
    </div>
  );
}
