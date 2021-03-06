export class Either<E, S> {
    protected constructor(
        public readonly isLeft: boolean,
        public readonly isRight: boolean) { }

    /**
     * Applies fl if it is left, fr if it is right
     * @param fl the function to apply if this is a `Left`
     * @param fr the function to apply if this is a `Right`
     */
    public fold<Next>(fl: (arg0: E) => Next, fr: (arg0: S) => Next): Next {
        return this.isLeft ? fl(this.toLeft().error) : fr(this.toRight().value);
    }

    /**
     * Bind the given function across `Right`
     * @param f 
     */
    public map<Next>(f: (arg0: S) => Next): Either<E, Next> {
        if (this.isLeft) {
            return this.toLeft();
        }

        return new Right(f(((this as unknown) as Right<S>).value));
    }

    /**
     * Map the function if it is Right, if it is left it stayis the same
     * @param f 
     */
    public flatMap<S1>(f: (arg0: S) => Either<E, S1>): Either<E, S1> {
        if (this.isLeft) {
            return this.toLeft();
        }

        return f(((this as unknown) as Right<S>).value);
    }

    /**
     * Shortcut for casting to Right, you should use isRight or isLeft beforehand
     * @throws Error if not of the correct type
     */
    public toRight(): Right<S> {
        if (this.isLeft) {
            throw new Error("Left should not be cast as right");
        }

        return this as unknown as Right<S>;
    }

    /**
     * Shortcut for casting to Left, you should use isLeft or isRight beforehand
     * @throws Error if not of the correct type
     */
    public toLeft(): Left<E> {
        if (this.isRight) {
            throw new Error("Right should not be cast as left");
        }

        return this as unknown as Left<E>;
    }
}

// tslint:disable-next-line: max-classes-per-file
export class Right<S> extends Either<any, S> {
    constructor(public readonly value: S) { super(false, true) ; }
}

// tslint:disable-next-line: max-classes-per-file
export class Left<E> extends Either<E, any> {
    constructor(public readonly error: E) { super(true, false); }
}
