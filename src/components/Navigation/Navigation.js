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
import {Image} from 'react-bootstrap';

function Navigation({className, data}) {
  console.log(data);

  setTimeout(() => {
    data.refetch();
  }, 50);

  return (
    <div className={cx(s.root, className)} role="navigation">
      {data.me
        ? <span className={s.link}>
          <Image src={data.me.pic} circle style={{height:35, marginTop: -5, marginBottom: -5}}/>
          &nbsp;&nbsp;{data.me.fullName}
        </span>
        : <span>
        <Link className={s.link} to="/about">About</Link>
      <Link className={s.link} to="/contact">Contact</Link>
      </span>
      }

      <span className={s.spacer}> | </span>

      { (data && data.me && data.me.fullName)
        ?
        <Link className={cx(s.link, s.highlight)} onClick={() => {
              window.location.reload();
            console.log('removed the cookies');
        }} to="/logout" refresh>Sign out</Link>
        : <Link className={cx(s.link, s.highlight)} to="/auth/github/" onClick={() => {
              window.location.reload();
        }
        } refresh>Sign in with Github</Link>
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
