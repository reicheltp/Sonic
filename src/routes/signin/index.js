/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Signin from './Signin';

export const path = '/signin';
export const action = async (state) => {
  const title = 'Sign In';
  state.context.onSetTitle(title);
  return <Signin title={title} />;
};
