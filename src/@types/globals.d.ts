declare type Replace<InitialType, ReplaceType> = Omit<
  InitialType,
  keyof ReplaceType
> &
  ReplaceType;
