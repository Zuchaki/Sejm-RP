'use client';

import { Hand, Shrink, ZoomIn, ZoomOut } from 'lucide-react';
import { createContext, useContext, useState } from 'react';
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const MIN_SCALE = 1;
const ZOOMED_IN_THRESHOLD = MIN_SCALE + 0.01;

const FreeControlContext = createContext(false);
const SetFreeControlContext = createContext<((freeControl: boolean) => void) | null>(null);

const useZoomPan = () => {
  const freeControl = useContext(FreeControlContext);
  const setFreeControl = useContext(SetFreeControlContext);

  if (!setFreeControl) {
    throw new Error('useZoomPan must be used within a <ZoomPan />');
  }

  return { freeControl, setFreeControl };
};

const ZoomPan = ({
  maxScale = 20,
  className,
  children,
}: {
  maxScale?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const [freeControl, setFreeControl] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const canPan = freeControl || zoomedIn;

  return (
    <FreeControlContext value={freeControl}>
      <SetFreeControlContext value={setFreeControl}>
        <TransformWrapper
          minScale={MIN_SCALE}
          maxScale={maxScale}
          wheel={{ activationKeys: freeControl ? [] : ['Control'] }}
          trackPadPanning={{ disabled: !freeControl }}
          panning={{ disabled: !canPan, velocityDisabled: true }}
          doubleClick={{ disabled: !freeControl }}
          keyboard={{ disabled: false, zoomStep: 0.5 }}
          onTransform={(_, { scale }) => {
            setZoomedIn(scale > ZOOMED_IN_THRESHOLD);
          }}
        >
          <div
            data-slot="zoom-pan"
            data-can-pan={canPan || undefined}
            className={twMerge('group/zoom-pan relative overflow-hidden', className)}
          >
            {children}
          </div>
        </TransformWrapper>
      </SetFreeControlContext>
    </FreeControlContext>
  );
};

const ZoomPanContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <TransformComponent
    wrapperClass="outline-primary-600 focus-visible:outline-2 focus-visible:-outline-offset-2 group-data-can-pan/zoom-pan:cursor-grab group-data-can-pan/zoom-pan:active:cursor-grabbing"
    wrapperStyle={{ width: '100%' }}
    wrapperProps={{
      'aria-label': 'Podgląd z powiększeniem. Strzałki przesuwają, plus i minus przybliżają.',
    }}
    contentClass={className}
    contentStyle={{ width: '100%' }}
  >
    {children}
  </TransformComponent>
);

const ZoomPanControls = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    data-slot="zoom-pan-controls"
    className={twMerge('absolute right-3 bottom-3 z-10 flex flex-col gap-2', className)}
  >
    {children}
  </div>
);

const ZoomPanZoomIn = () => {
  const { zoomIn, instance } = useControls();

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Przybliż"
      title="Przybliż"
      onClick={async () => {
        await zoomIn(instance.state.scale);
      }}
    >
      <ZoomIn aria-hidden className="size-5" />
    </Button>
  );
};

const ZoomPanZoomOut = () => {
  const { zoomOut, instance } = useControls();

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Oddal"
      title="Oddal"
      onClick={async () => {
        await zoomOut(instance.state.scale / 2);
      }}
    >
      <ZoomOut aria-hidden className="size-5" />
    </Button>
  );
};

const ZoomPanReset = () => {
  const { resetTransform } = useControls();

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Pokaż całość"
      title="Pokaż całość"
      onClick={async () => {
        await resetTransform();
      }}
    >
      <Shrink aria-hidden className="size-5" />
    </Button>
  );
};

const ZoomPanFreeControlToggle = () => {
  const { freeControl, setFreeControl } = useZoomPan();

  return (
    <Button
      variant={freeControl ? 'primary' : 'secondary'}
      size="icon"
      aria-label="Swobodne sterowanie"
      aria-pressed={freeControl}
      title="Swobodne sterowanie: scroll przybliża bez Ctrl, przeciąganie przesuwa widok"
      onClick={() => {
        setFreeControl(!freeControl);
      }}
    >
      <Hand aria-hidden className="size-5" />
    </Button>
  );
};

const ZoomPanHint = ({ className }: { className?: string }) => {
  const { freeControl } = useZoomPan();

  if (freeControl) {
    return null;
  }

  return (
    <Text
      variant="caption"
      className={twMerge(
        'pointer-events-none absolute top-3 left-3 rounded-lg bg-white/90 px-2 py-1 text-neutral-600 hidden lg:flex',
        className,
      )}
    >
      Ctrl + scroll, aby przybliżyć
    </Text>
  );
};

export {
  ZoomPan,
  ZoomPanContent,
  ZoomPanControls,
  ZoomPanFreeControlToggle,
  ZoomPanHint,
  ZoomPanReset,
  ZoomPanZoomIn,
  ZoomPanZoomOut,
};
