-- AlterTable
CREATE SEQUENCE comment_id_seq;
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT nextval('comment_id_seq');
ALTER SEQUENCE comment_id_seq OWNED BY "Comment"."id";

-- AlterTable
CREATE SEQUENCE post_id_seq;
ALTER TABLE "Post" ALTER COLUMN "id" SET DEFAULT nextval('post_id_seq');
ALTER SEQUENCE post_id_seq OWNED BY "Post"."id";
