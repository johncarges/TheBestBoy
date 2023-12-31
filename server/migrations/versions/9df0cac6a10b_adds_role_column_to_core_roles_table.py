"""adds role column to core_roles table

Revision ID: 9df0cac6a10b
Revises: ec8cb4c0d654
Create Date: 2023-10-16 09:36:03.143756

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9df0cac6a10b'
down_revision = 'ec8cb4c0d654'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('core_roles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('core_roles', schema=None) as batch_op:
        batch_op.drop_column('role')

    # ### end Alembic commands ###
