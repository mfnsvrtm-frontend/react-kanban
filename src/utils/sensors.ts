// https://github.com/clauderic/dnd-kit/issues/477

import { MouseSensor as LibMouseSensor} from '@dnd-kit/core';
import { MouseEvent } from 'react';

// Block DnD event propagation if element have 'data-no-dnd' attribute
const handler = ({ nativeEvent: event }: MouseEvent) => {
    let cur = event.target as HTMLElement;

    while (cur) {
        if (cur.dataset && cur.dataset.noDnd) {
            return false;
        }
        cur = cur.parentElement as HTMLElement;
    }

    return true;
};

export class MouseSensor extends LibMouseSensor {
    static activators = [{ eventName: 'onMouseDown', handler }] as typeof LibMouseSensor['activators'];
}