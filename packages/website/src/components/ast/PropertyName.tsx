import type { MouseEvent } from 'react';
import React, { useCallback } from 'react';

import styles from './ASTViewer.module.css';

export interface PropertyNameProps {
  readonly typeName?: string;
  readonly propName?: string;
  readonly onClick?: (e: MouseEvent<HTMLElement>) => void;
  readonly onHover?: (e: boolean) => void;
}

export default function PropertyName(props: PropertyNameProps): JSX.Element {
  const { onClick: onClickProps, onHover } = props;

  const onClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClickProps?.(e);
    },
    [onClickProps],
  );

  const onMouseEnter = useCallback(() => {
    onHover?.(true);
  }, [onHover]);

  const onMouseLeave = useCallback(() => {
    onHover?.(false);
  }, [onHover]);

  return props.onClick || props.onHover ? (
    <>
      {props.propName && (
        <a
          href={`#${props.propName}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          className={styles.propName}
        >
          {props.propName}
        </a>
      )}
      {props.propName && <span>: </span>}
      {props.typeName && (
        <a
          href={`#${props.typeName}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          className={styles.tokenName}
        >
          {props.typeName}
        </a>
      )}
      {props.typeName && <span> </span>}
    </>
  ) : (
    <>
      {props.propName && (
        <span className={styles.propName}>{props.propName}</span>
      )}
      {props.propName && <span>: </span>}
      {props.typeName && (
        <span className={styles.tokenName}>{props.typeName}</span>
      )}
      {props.typeName && <span> </span>}
    </>
  );
}
