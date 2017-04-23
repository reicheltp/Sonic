/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../Link';
import {gql, graphql} from 'react-apollo';

function Navigation({className, data}) {
  console.log(data);

  setTimeout(() => {
    data.refetch();
  }, 200);

  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.link} to="/about">About</Link>
      <Link className={s.link} to="/contact">Contact</Link>
      <span className={s.spacer}> | </span>

      { (data && data.me && data.me.fullName)
        ? <Link className={cx(s.link, s.highlight)} to="/logout">Sign out</Link>
        : <Link className={cx(s.link, s.highlight)} to="/auth/github">Sign in with Github</Link>
      }
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

const NavigationWithStyles = withStyles(Navigation, s);

const FetchData = gql`query{me{id, fullName, pic, __typename}}`;

const NavigationWithData = graphql(FetchData)(NavigationWithStyles);

export default NavigationWithData;
