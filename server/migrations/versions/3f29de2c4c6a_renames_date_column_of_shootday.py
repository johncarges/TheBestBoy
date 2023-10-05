"""renames date column of shootday

Revision ID: 3f29de2c4c6a
Revises: 210a9e3a065d
Create Date: 2023-10-05 09:58:13.001936

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f29de2c4c6a'
down_revision = '210a9e3a065d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shootdays', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.DateTime(), nullable=True))
        batch_op.drop_column('day')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shootdays', schema=None) as batch_op:
        batch_op.add_column(sa.Column('day', sa.DATETIME(), nullable=True))
        batch_op.drop_column('date')

    # ### end Alembic commands ###
