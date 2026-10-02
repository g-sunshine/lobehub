import { Flexbox } from '@lobehub/ui';
import { ActionIcon, Text } from '@lobehub/ui/base-ui';
import { createStaticStyles } from 'antd-style';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { homeType } from './components/homeType';
import { HOME_QUICK_GUIDE_STEPS, useHomeQuickGuide } from './useHomeQuickGuide';

const styles = createStaticStyles(({ css, cssVar }) => ({
  // Sized by its own column, not the viewport: the nav panel and the rail both
  // take width the viewport cannot see. Stacked like the composer and the rail
  // cards, so the portrait stands behind the glass rather than on top of it.
  card: css`
    position: relative;
    z-index: 1;

    container-type: inline-size;

    padding: 16px;
    border: 1px solid ${cssVar.colorFillSecondary};
    border-radius: 20px;

    /* Opaque: the portrait passes behind this card, and a fill-tinted mix
       would let it show through. One step under the composer's elevated
       surface, so the composer stays the primary thing on the page. */
    background: ${cssVar.colorBgContainer};
  `,
  stepIndex: css`
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    border-radius: 50%;

    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: ${cssVar.colorPrimary};

    background: ${cssVar.colorPrimaryBg};
  `,
  steps: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;

    margin: 0;
    padding: 0;

    list-style: none;

    @container (width < 560px) {
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }
  `,
}));

/** First-run orientation above the composer, until the viewer closes it. */
const QuickGuide = () => {
  const { t } = useTranslation('home');
  const { dismiss, visible } = useHomeQuickGuide();

  if (!visible) return null;

  const title = t('dashboard.quickGuide.title');

  return (
    <section aria-label={title} className={styles.card} data-testid={'home-quick-guide'}>
      <Flexbox gap={12}>
        <Flexbox horizontal align={'center'} justify={'space-between'}>
          <Text className={homeType.sectionLabel}>{title}</Text>
          <ActionIcon
            icon={X}
            size={'small'}
            title={t('dashboard.quickGuide.dismiss')}
            onClick={dismiss}
          />
        </Flexbox>
        <ol className={styles.steps}>
          {HOME_QUICK_GUIDE_STEPS.map((step, index) => (
            <li key={step}>
              <Flexbox horizontal align={'flex-start'} gap={10}>
                <span aria-hidden className={styles.stepIndex}>
                  {index + 1}
                </span>
                <Flexbox gap={2} style={{ flex: 1, minWidth: 0 }}>
                  <Text className={homeType.itemTitle}>
                    {t(`dashboard.quickGuide.step.${step}.title`)}
                  </Text>
                  <Text className={homeType.supporting}>
                    {t(`dashboard.quickGuide.step.${step}.description`)}
                  </Text>
                </Flexbox>
              </Flexbox>
            </li>
          ))}
        </ol>
      </Flexbox>
    </section>
  );
};

export default QuickGuide;
