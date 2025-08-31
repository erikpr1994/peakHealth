import { describe, it, expect } from 'vitest';
import { SECTION_TYPE_OPTIONS, SectionTypeOption } from './section';

describe('Section Types', () => {
  describe('SECTION_TYPE_OPTIONS', () => {
    it('should contain all required section types', () => {
      const expectedTypes = [
        'warmup',
        'cooldown',
        'basic',
        'emom',
        'tabata',
        'circuit',
      ];

      expect(SECTION_TYPE_OPTIONS).toHaveLength(6);

      SECTION_TYPE_OPTIONS.forEach(option => {
        expect(expectedTypes).toContain(option.type);
      });
    });

    it('should have correct categories', () => {
      const commonSections = SECTION_TYPE_OPTIONS.filter(
        option => option.category === 'common'
      );
      const strengthSections = SECTION_TYPE_OPTIONS.filter(
        option => option.category === 'strength'
      );

      expect(commonSections).toHaveLength(2);
      expect(strengthSections).toHaveLength(4);

      expect(commonSections.map(s => s.type)).toEqual(['warmup', 'cooldown']);
      expect(strengthSections.map(s => s.type)).toEqual([
        'basic',
        'emom',
        'tabata',
        'circuit',
      ]);
    });

    it('should have unique types', () => {
      const types = SECTION_TYPE_OPTIONS.map(option => option.type);
      const uniqueTypes = new Set(types);

      expect(uniqueTypes.size).toBe(types.length);
    });

    it('should have valid category values', () => {
      const validCategories = ['common', 'strength'];

      SECTION_TYPE_OPTIONS.forEach(option => {
        expect(validCategories).toContain(option.category);
      });
    });

    it('should have non-empty labels and descriptions', () => {
      SECTION_TYPE_OPTIONS.forEach(option => {
        expect(option.label).toBeTruthy();
        expect(option.label.trim().length).toBeGreaterThan(0);
        expect(option.description).toBeTruthy();
        expect(option.description.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('SectionTypeOption interface', () => {
    it('should have correct structure', () => {
      const sampleOption: SectionTypeOption = {
        type: 'basic',
        label: 'Basic',
        description: 'A standard section for strength training',
        category: 'strength',
      };

      expect(sampleOption).toHaveProperty('type');
      expect(sampleOption).toHaveProperty('label');
      expect(sampleOption).toHaveProperty('description');
      expect(sampleOption).toHaveProperty('category');
    });
  });
});
