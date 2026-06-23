'use client';

import * as React from 'react';
import {
  LayoutGroup,
  motion,
  useAnimate,
  delay,
  type Transition,
  type AnimationSequence,
} from 'motion/react';

type OrbitItem = {
  id: number;
  name: string;
  position?: string;
  src: string;
  photoPosition?: string;
  onClick?: () => void;
};

interface ComponentProps {
  orbitItems: OrbitItem[];
  stageSize?: number;
  imageSize?: number;
  showLabels?: boolean;
  centerLabel?: React.ReactNode;
  onCollapse?: () => void;
}

const transition: Transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: 'spring',
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: 'linear' as const,
  repeat: Infinity,
};

const qsa = (root: Element, sel: string) =>
  Array.from(root.querySelectorAll(sel));

const angleOf = (el: Element) => Number((el as HTMLElement).dataset.angle || 0);

const armOfImg = (img: Element) =>
  (img as HTMLElement).closest('[data-arm]') as HTMLElement | null;

function RadialIntro({
  orbitItems,
  stageSize = 320,
  imageSize = 60,
  showLabels = false,
  centerLabel,
  onCollapse,
}: ComponentProps) {
  const step = 360 / orbitItems.length;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const arms = qsa(root, '[data-arm]');
    const imgs = qsa(root, '[data-arm-image]');
    const labels = qsa(root, '[data-arm-label]');
    const stops: Array<() => void> = [];

    delay(() => animate(imgs, { top: 0 }, transition), 250);

    const orbitPlacementSequence: AnimationSequence = [
      ...arms.map((el): [Element, Record<string, any>, any] => [
        el,
        { rotate: angleOf(el) },
        { ...transition, at: 0 },
      ]),
      ...imgs.map((img): [Element, Record<string, any>, any] => [
        img,
        { rotate: -angleOf(armOfImg(img)!), opacity: 1 },
        { ...transition, at: 0 },
      ]),
      ...labels.map((lbl): [Element, Record<string, any>, any] => [
        lbl,
        { rotate: -angleOf(armOfImg(lbl)!), opacity: 1 },
        { ...transition, at: 0 },
      ]),
    ];

    delay(() => animate(orbitPlacementSequence), 700);

    delay(() => {
      arms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      imgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(img, { rotate: [-angle, -angle - 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      labels.forEach((lbl) => {
        const arm = armOfImg(lbl);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(lbl, { rotate: [-angle, -angle - 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => stops.forEach((stop) => stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const center = stageSize / 2;
  const labelOffset = imageSize / 2 + 14;

  return (
    <LayoutGroup>
      <motion.div
        ref={scope}
        className="relative overflow-visible"
        style={{ width: stageSize, height: stageSize }}
        initial={false}
      >
        {orbitItems.map((item, i) => (
          <motion.div
            key={item.id}
            data-arm
            className="will-change-transform absolute inset-0"
            style={{ zIndex: orbitItems.length - i, pointerEvents: 'none' }}
            data-angle={i * step}
            layoutId={`arm-${item.id}`}
          >
            {/* avatar */}
            <motion.img
              data-arm-image
              className="rounded-full object-cover absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 select-none"
              style={{
                width: imageSize,
                height: imageSize,
                opacity: i === 0 ? 1 : 0,
                cursor: item.onClick ? 'pointer' : 'default',
                pointerEvents: 'auto',
                objectPosition: item.photoPosition ?? 'center',
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
              src={item.src}
              alt={item.name}
              draggable={false}
              layoutId={`arm-img-${item.id}`}
              onClick={item.onClick}
              whileHover={item.onClick ? { scale: 1.18, boxShadow: '0 0 0 3px rgba(255,255,255,0.5)' } : undefined}
              title={item.name}
            />

            {/* name label — only rendered when showLabels is true */}
            {showLabels && (
              <motion.div
                data-arm-label
                className="absolute left-1/2 -translate-x-1/2 select-none pointer-events-none"
                style={{
                  top: `calc(50% + ${labelOffset}px)`,
                  opacity: 0,
                  textAlign: 'center',
                  width: 110,
                  marginLeft: -55,
                  left: '50%',
                }}
              >
                <p className="font-black text-white leading-tight" style={{ fontSize: 10, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                  {item.name.split(' ')[0]}
                </p>
                {item.position && (
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>
                    {item.position}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* center content */}
        {centerLabel ? (
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ left: center - 52, top: center - 52, width: 104, height: 104, zIndex: orbitItems.length + 1 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 300, damping: 22 }}
          >
            {centerLabel}
          </motion.div>
        ) : onCollapse ? (
          <motion.button
            onClick={onCollapse}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute flex items-center justify-center rounded-full focus:outline-none"
            style={{
              width: 36, height: 36,
              left: center - 18, top: center - 18,
              zIndex: orbitItems.length + 1,
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(4px)',
              color: 'white',
            }}
            whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.25)' }}
            title="Collapse"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>
        ) : null}
      </motion.div>
    </LayoutGroup>
  );
}

export { RadialIntro };
export type { OrbitItem };
