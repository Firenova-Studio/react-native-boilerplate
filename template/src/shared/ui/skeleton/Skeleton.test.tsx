import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import TestAppWrapper from '@/tests/TestAppWrapper';

import SkeletonLoader from './Skeleton';

const WAIT = 800;

describe('SkeletonLoader', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders children when not loading', () => {
    render(
      <SkeletonLoader loading={false}>
        <Text>Loaded Content</Text>
      </SkeletonLoader>,
      {
        wrapper: TestAppWrapper,
      },
    );

    expect(screen.getByText('Loaded Content')).toBeTruthy();
  });

  it('renders skeleton when loading', () => {
    render(<SkeletonLoader loading />, {
      wrapper: TestAppWrapper,
    });

    jest.advanceTimersByTime(WAIT);

    expect(screen.getByTestId('skeleton-loader')).toBeTruthy();
  });

});
