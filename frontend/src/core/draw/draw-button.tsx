import React from 'react';
import { defaultDrawAPI } from './draw.api';

export interface ExportButtonProps {}

export const button: React.FC = ( {}: ExportButtonProps) => {
 
    const test = defaultDrawAPI.draw();
    // const test = {data:{name:"bobsen"}}
    return <p>{test?.name}</p>
}

