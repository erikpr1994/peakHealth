import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

describe('Tabs', () => {
  it('renders tabs with the correct ARIA attributes', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    // Check tablist role
    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');

    // Check tab roles
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    // Check tabpanel roles
    const tabpanels = screen.getAllByRole('tabpanel');
    expect(tabpanels).toHaveLength(1); // Only the active one is in the DOM
    expect(tabpanels[0]).toHaveTextContent('Tab 1 content');
  });

  it('changes tab when clicking on a tab trigger', async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    // Initial state
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Click on the second tab
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    // Check that the content has changed
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 2 content');
  });

  it('supports controlled mode', () => {
    const handleValueChange = vi.fn();

    const { rerender } = render(
      <Tabs value="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    // Initial state
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Click on the second tab
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

    // Check that the callback was called
    expect(handleValueChange).toHaveBeenCalledWith('tab2');

    // Content should not change in controlled mode until value prop changes
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Update the value prop
    rerender(
      <Tabs value="tab2" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    // Now the content should change
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 2 content');
  });

  it('supports keyboard navigation in horizontal orientation', async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
        <TabsContent value="tab3">Tab 3 content</TabsContent>
      </Tabs>
    );

    // Focus the first tab
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();

    // Press right arrow to move to the next tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 2' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 2 content');

    // Press right arrow again to move to the last tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 3' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 3 content');

    // Press right arrow again to cycle back to the first tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 1' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Press left arrow to cycle to the last tab
    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 3' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 3 content');

    // Press Home to go to the first tab
    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 1' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Press End to go to the last tab
    await user.keyboard('{End}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 3' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 3 content');
  });

  it('supports vertical orientation', () => {
    render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    // Check tablist orientation
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    expect(tablist).toHaveClass('peakhealth-tabs--vertical');

    // Check that the tabs list has the vertical class
    const tabsList = tablist.firstChild;
    expect(tabsList).toHaveClass('peakhealth-tabs__list--vertical');
  });

  it('supports disabled tabs', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
        <TabsContent value="tab3">Tab 3 content</TabsContent>
      </Tabs>
    );

    // Try to click the disabled tab
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    // The value should not change
    expect(handleValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Focus the first tab and try to navigate to the disabled tab with keyboard
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();

    // Press right arrow - should skip the disabled tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: 'Tab 3' })
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 3 content');
  });
});
