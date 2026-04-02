import React from 'react';
import { RouteObject } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
export const appRoutes: RouteObject[] = [...publicRoutes, ...privateRoutes];
export { publicRoutes, privateRoutes };