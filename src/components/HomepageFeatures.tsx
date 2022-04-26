import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '《宁静祷文》',
    image: '/img/logo.svg',
    description: (
      <>
        请赐予我力量，全力改变那些可以改变的事情，平静接受那些无能为力的事情，拥有智慧区分这两者
      </>
    ),
  },
  {
    title: '《悠长假期》',
    image: '/img/logo-right.svg',
    description: (
      <>
        人生总有不顺的时候，不必勉强冲刺，就把它当作老天给的悠长假期，好好享受这个假期。突然一天假期结束，时来运转，人生才真正开始
      </>
    ),
  },
  {
    title: '《曾国藩家书》',
    image: '/img/logo-middle.svg',
    description: (
      <>
        人生应该做到"四耐"："耐冷耐苦，耐劳耐闲。
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
